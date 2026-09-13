export interface Stat {
	id: string;
	label: string;
	value?: string;
}

export const STATS: readonly Stat[] = [
	{ id: "tvl", label: "Total value locked" },
	{ id: "depositors", label: "Depositors" },
	{ id: "coverage", label: "Active coverage sold" },
	{ id: "losses", label: "Losses applied to date" },
];

export const STATS_NOTE =
	"Figures land here once the pool is live on mainnet. Until then a dash is " +
	"the only honest number.";
