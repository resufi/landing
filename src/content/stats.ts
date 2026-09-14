import type { OnchainStats } from "@/lib/onchain";
import { EXPLORER, TON } from "@/lib/protocol";

export interface Stat {
	id: string;
	label: string;
	value?: string;
	hint: string;
}

function amount(value: bigint | null): string | undefined {
	if (value === null) return undefined;
	const n = Number(value) / 1e9;
	if (n === 0) return `0 ${TON.assetSymbol}`;
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M ${TON.assetSymbol}`;
	if (n >= 1000) return `${(n / 1000).toFixed(1)}K ${TON.assetSymbol}`;
	return `${Number(n.toFixed(2))} ${TON.assetSymbol}`;
}

export function statsFrom(data: OnchainStats): readonly Stat[] {
	return [
		{
			id: "tvl",
			label: "Total value locked",
			value: amount(data.tvl),
			hint: "TON mainnet",
		},
		{
			id: "depositors",
			label: "Depositors",
			value: data.depositors === null ? undefined : String(data.depositors),
			hint: "across all tranches",
		},
		{
			id: "losses",
			label: "Losses applied to date",
			value: amount(data.losses),
			hint: "since launch",
		},
		{
			id: "ceiling",
			label: "Loss ceiling",
			value:
				data.maxLossBps === null ? undefined : `${data.maxLossBps / 100}%`,
			hint: "fixed at deploy",
		},
	];
}

export const STATS_NOTE =
	"Read live from the TON mainnet vault, not typed in by hand. The pool is " +
	"open and the caps are deliberately tiny: we are testing the mechanics on " +
	"our own money first. The Solana build runs the same arithmetic and is in " +
	"testing ahead of its own mainnet pool.";

export const STATS_LINK = {
	href: EXPLORER,
	label: "Check the contract yourself",
};
