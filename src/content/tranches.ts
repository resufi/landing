/** Три транша — это очередь на убыток, и цвет здесь несёт смысл, а не декор. */
export type TrancheId = "junior" | "middle" | "senior";

export interface Tranche {
	id: TrancheId;
	name: string;
	/** Место в очереди на убыток, словами. */
	place: string;
	/** Ориентир доходности. Именно ориентир: базовая ставка не наша. */
	net: string;
	headline: string;
	body: string;
}

export const TRANCHES: readonly Tranche[] = [
	{
		id: "junior",
		name: "Junior",
		place: "Loses first",
		net: "~10.3% a year",
		headline: "Loses first, earns most",
		body:
			"Takes the first hit in full and can be wiped out entirely. In exchange " +
			"it collects what senior pays, plus every insurance premium the protocol " +
			"sells.",
	},
	{
		id: "middle",
		name: "Middle",
		place: "Loses second",
		net: "~4.7% a year",
		headline: "Loses second",
		body:
			"Untouched until junior is at zero. Earns a small premium over plain " +
			"staking for standing second in the queue.",
	},
	{
		id: "senior",
		name: "Senior",
		place: "Loses last",
		net: "~2.5% a year",
		headline: "Loses last, earns least",
		body:
			"Gives up 2% a year — the price of calm. While junior and middle " +
			"together cover the loss ceiling, senior cannot be touched at all.",
	},
];

/** Год без происшествий. Базовый стейкинг взят 4,5% — это пример, не обещание. */
export const YIELD_ROWS = [
	{ tranche: "Senior", staking: "+4.5%", fee: "−2.0%", net: "+2.5%" },
	{ tranche: "Middle", staking: "+4.5%", fee: "+0.2%", net: "+4.7%" },
	{ tranche: "Junior", staking: "+4.5%", fee: "+5.8%", net: "+10.3%" },
] as const;

/** Тот же убыток в обычном пуле и у нас. Пул 10 000, убыток 500. */
export const COMPARE_ROWS = [
	{ who: "Yield chaser · junior", ordinary: "−5.0%", resu: "−25.0%" },
	{ who: "Balanced · middle", ordinary: "−5.0%", resu: "0.0%" },
	{ who: "Cautious · senior", ordinary: "−5.0%", resu: "0.0%" },
] as const;

/** Как убыток идёт снизу вверх и где он упирается в потолок. */
export const WATERFALL_ROWS = [
	{ loss: "500 coins", junior: "1,500", middle: "2,000", senior: "6,000" },
	{ loss: "2,500 coins", junior: "0", middle: "1,500", senior: "6,000" },
	{ loss: "3,000 coins — the ceiling", junior: "0", middle: "1,000", senior: "6,000" },
] as const;
