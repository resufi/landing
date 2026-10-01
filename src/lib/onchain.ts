import { TON } from "./protocol";

const API = "https://toncenter.com/api";

const TIMEOUT_MS = 8000;

export interface OnchainStats {
	tvl: bigint | null;
	/** Суммарный TVL по всем пулам в долларах (USDT-эквивалент). */
	tvlUsd: number | null;
	depositors: number | null;
	losses: bigint | null;
	maxLossBps: number | null;
}

const EMPTY: OnchainStats = {
	tvl: null,
	tvlUsd: null,
	depositors: null,
	losses: null,
	maxLossBps: null,
};

/**
 * Пулы на EVM-сетях. nav() у OracleVault уже возвращает wad USD (1e18),
 * поэтому их стоимость складывается в доллары напрямую, без котировок.
 */
const NAV_SELECTOR = "0xc1590cd7"; // nav()
const EVM_VAULTS: { rpc: string; vault: string }[] = [
	{ rpc: "https://rpc.hyperliquid.xyz/evm", vault: "0x53F7e94a0edd3CFb958332842ec1fEce566f941d" }, // HLP
	{ rpc: "https://rpc.mainnet.chain.robinhood.com", vault: "0x5285F357Eb16E6fd40ba73fCA4F37776A3A5d129" }, // SPY
	{ rpc: "https://arb1.arbitrum.io/rpc", vault: "0x8a8CB825f4CCd2e93604e828f62C3ce3f5C8F464" }, // WETH
	{ rpc: "https://mainnet.base.org", vault: "0x80669f196620597AC5740416CB85754761Ccb786" }, // MSFT
	{ rpc: "https://mainnet.base.org", vault: "0xb555F9D5eF631868cF070Fe3466765E26502693A" }, // NVDA
];

/** Второй TON-пул: tsUSDe (6 знаков, стейбл ≈ $1). */
const STABLE_VAULT = "EQC-EijLoFEAy-pMuvxjlRtQ4yqmKO62ZnptY0J3VvAgVwdE";
const STABLE_ASSET = "EQDQ5UUyPHrLcQJlPAczd_fjxn8SLrlNQwolBznxCdSlfQwr";

async function readEvmNav(rpc: string, vault: string): Promise<bigint> {
	try {
		const res = await fetch(rpc, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "eth_call",
				params: [{ to: vault, data: NAV_SELECTOR }, "latest"],
			}),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		if (!res.ok) return 0n;
		const json = (await res.json()) as { result?: string };
		if (!json.result || json.result === "0x") return 0n;
		return BigInt(json.result);
	} catch {
		return 0n;
	}
}

/** Цена TON в долларах. tsTON привязан к TON примерно один к одному. */
async function tonUsd(): Promise<number | null> {
	try {
		const res = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd",
			{ signal: AbortSignal.timeout(TIMEOUT_MS) },
		);
		if (!res.ok) return null;
		const json = (await res.json()) as Record<string, { usd?: number }>;
		const p = json["the-open-network"]?.usd;
		return typeof p === "number" ? p : null;
	} catch {
		return null;
	}
}

async function readJettonBalance(
	vault: string,
	asset: string,
	apiKey?: string,
): Promise<bigint | null> {
	const data = await get<JettonWallets>(
		`/v3/jetton/wallets?owner_address=${vault}&limit=20`,
		apiKey,
	);
	const wallets = data?.jetton_wallets;
	if (!wallets) return null;
	const wanted = normalize(asset);
	const own = wallets.find((w) => normalize(w.jetton) === wanted);
	return own ? BigInt(own.balance) : 0n;
}

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

	// Суммарный TVL в долларах по всем пулам: tsTON × цена TON, tsUSDe ≈ $1,
	// и nav() каждого EVM-вольта (уже в wad USD). EVM и котировки — другие
	// хосты, лимит toncenter на них не распространяется.
	let tvlUsd: number | null = null;
	{
		let usd = 0;
		let any = false;
		const price = await tonUsd();
		if (tvl !== null && price !== null) {
			usd += (Number(tvl) / 1e9) * price;
			any = true;
		}
		await wait(pause);
		const stable = await readJettonBalance(STABLE_VAULT, STABLE_ASSET, apiKey);
		if (stable !== null) {
			usd += Number(stable) / 1e6;
			any = true;
		}
		for (const v of EVM_VAULTS) {
			usd += Number(await readEvmNav(v.rpc, v.vault)) / 1e18;
			any = true;
		}
		tvlUsd = any ? usd : null;
	}

	if (!state && tvl === null && depositors === null && tvlUsd === null) {
		return EMPTY;
	}

	const [, losses, maxLossBps] = state ?? [];

	return {
		tvl,
		tvlUsd,
		depositors,
		losses: losses ?? null,
		maxLossBps: maxLossBps === undefined ? null : Number(maxLossBps),
	};
}
