import { TON } from "./protocol";

const API = "https://toncenter.com/api";

const TIMEOUT_MS = 8000;

export interface OnchainStats {
	tvl: bigint | null;
	depositors: number | null;
	losses: bigint | null;
	maxLossBps: number | null;
}

const EMPTY: OnchainStats = {
	tvl: null,
	depositors: null,
	losses: null,
	maxLossBps: null,
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get<T>(
	path: string,
	apiKey: string | undefined,
	init?: RequestInit,
): Promise<T | null> {
	try {
		const res = await fetch(`${API}${path}`, {
			...init,
			headers: {
				"Content-Type": "application/json",
				...(apiKey ? { "X-API-Key": apiKey } : {}),
				...init?.headers,
			},
			...(typeof window !== "undefined" ? { cache: "no-store" as const } : {}),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

type GetMethodResult = {
	ok: boolean;
	result?: { stack: [string, string][]; exit_code: number };
};

async function runGetMethod(
	address: string,
	method: string,
	apiKey?: string,
): Promise<bigint[] | null> {
	const body = JSON.stringify({ address, method, stack: [] });
	const data = await get<GetMethodResult>("/v2/runGetMethod", apiKey, {
		method: "POST",
		body,
	});
	if (!data?.ok || !data.result || data.result.exit_code !== 0) return null;
	return data.result.stack.map(([, v]) => BigInt(v));
}

type JettonWallets = {
	jetton_wallets?: { owner: string; jetton: string; balance: string }[];
};

async function readTvl(apiKey?: string): Promise<bigint | null> {
	const data = await get<JettonWallets>(
		`/v3/jetton/wallets?owner_address=${TON.vault}&limit=20`,
		apiKey,
	);
	const wallets = data?.jetton_wallets;
	if (!wallets) return null;
	const wanted = normalize(TON.assetMaster);
	const own = wallets.find((w) => normalize(w.jetton) === wanted);
	return own ? BigInt(own.balance) : 0n;
}

async function readDepositors(
	apiKey: string | undefined,
	pause: number,
): Promise<number | null> {
	const owners = new Set<string>();
	let any = false;
	for (const master of TON.trancheMasters) {
		const data = await get<JettonWallets>(
			`/v3/jetton/wallets?jetton_address=${master}&limit=1000&exclude_zero_balance=true`,
			apiKey,
		);
		if (data?.jetton_wallets) {
			any = true;
			for (const w of data.jetton_wallets) owners.add(normalize(w.owner));
		}
		await wait(pause);
	}
	return any ? owners.size : null;
}

export function normalize(address: string): string {
	if (address.includes(":")) return address.toLowerCase();

	const bytes = decodeBase64(address.replace(/-/g, "+").replace(/_/g, "/"));
	if (!bytes || bytes.length !== 36) return address.toLowerCase();

	const workchain = bytes[1] === 0xff ? -1 : (bytes[1] ?? 0);
	const hash = Array.from(bytes.slice(2, 34))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return `${workchain}:${hash}`;
}

function decodeBase64(value: string): Uint8Array | null {
	try {
		if (typeof atob === "function") {
			return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
		}
		return Uint8Array.from(Buffer.from(value, "base64"));
	} catch {
		return null;
	}
}

export async function fetchStats(
	apiKey?: string,
	options: { depositors?: boolean } = {},
): Promise<OnchainStats> {
	const pause = apiKey ? 0 : 1100;
	const withDepositors = options.depositors ?? true;

	const state = await runGetMethod(TON.vault, "vaultState", apiKey);
	await wait(pause);
	const tvl = await readTvl(apiKey);

	let depositors: number | null = null;
	if (withDepositors) {
		await wait(pause);
		depositors = await readDepositors(apiKey, pause);
	}

	if (!state && tvl === null && depositors === null) return EMPTY;

	const [, losses, maxLossBps] = state ?? [];

	return {
		tvl,
		depositors,
		losses: losses ?? null,
		maxLossBps: maxLossBps === undefined ? null : Number(maxLossBps),
	};
}
