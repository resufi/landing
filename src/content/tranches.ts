export type TrancheId = "junior" | "middle" | "senior";

export interface Tranche {
	id: TrancheId;
	name: string;
	place: string;
	net: string;
}

export const TRANCHES: readonly Tranche[] = [
	{
		id: "junior",
		name: "Buffer",
		place: "Loses first",
		net: "~10.3% a year",
	},
	{
		id: "middle",
		name: "Balance",
		place: "Loses second",
		net: "~4.7% a year",
	},
	{
		id: "senior",
		name: "Shield",
		place: "Loses last",
		net: "~2.5% a year",
	},
];

export const YIELD_ROWS = [
	{ tranche: "Shield", staking: "+4.5%", fee: "−2.0%", net: "+2.5%" },
	{ tranche: "Balance", staking: "+4.5%", fee: "+0.2%", net: "+4.7%" },
	{ tranche: "Buffer", staking: "+4.5%", fee: "+5.8%", net: "+10.3%" },
] as const;

export interface CompareRow {
	who: string;
	ordinary: string;
	resu: string;
}

export const QUIET_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · buffer", ordinary: "+4.5%", resu: "+10.3%" },
	{ who: "Balanced · balance", ordinary: "+4.5%", resu: "+4.7%" },
	{ who: "Cautious · shield", ordinary: "+4.5%", resu: "+2.5%" },
];

export const LOSS_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · buffer", ordinary: "−5.0%", resu: "−25.0%" },
	{ who: "Balanced · balance", ordinary: "−5.0%", resu: "0.0%" },
	{ who: "Cautious · shield", ordinary: "−5.0%", resu: "0.0%" },
];
