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
		name: "Junior",
		place: "Loses first",
		net: "~10.3% a year",
	},
	{
		id: "middle",
		name: "Middle",
		place: "Loses second",
		net: "~4.7% a year",
	},
	{
		id: "senior",
		name: "Senior",
		place: "Loses last",
		net: "~2.5% a year",
	},
];

export const YIELD_ROWS = [
	{ tranche: "Senior", staking: "+4.5%", fee: "−2.0%", net: "+2.5%" },
	{ tranche: "Middle", staking: "+4.5%", fee: "+0.2%", net: "+4.7%" },
	{ tranche: "Junior", staking: "+4.5%", fee: "+5.8%", net: "+10.3%" },
] as const;

export interface CompareRow {
	who: string;
	ordinary: string;
	resu: string;
}

export const QUIET_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · junior", ordinary: "+4.5%", resu: "+10.3%" },
	{ who: "Balanced · middle", ordinary: "+4.5%", resu: "+4.7%" },
	{ who: "Cautious · senior", ordinary: "+4.5%", resu: "+2.5%" },
];

export const LOSS_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · junior", ordinary: "−5.0%", resu: "−25.0%" },
	{ who: "Balanced · middle", ordinary: "−5.0%", resu: "0.0%" },
	{ who: "Cautious · senior", ordinary: "−5.0%", resu: "0.0%" },
];
