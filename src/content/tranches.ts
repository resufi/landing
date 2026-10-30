export type TrancheId = "junior" | "middle" | "senior";

export interface Tranche {
	id: TrancheId;
	name: string;
	place: string;
	net: string;
}

/**
 * Hero queue — the coupon (RWA) model on an NVDA pool split 30/30/40
 * (junior/middle/senior), coupons senior 7% / middle 12%. Junior's leverage is
 * fixed by the weights (pool / junior share ≈ 3.3×); the coupons are the fixed
 * figures senior and middle earn.
 */
export const TRANCHES: readonly Tranche[] = [
	{
		id: "junior",
		name: "Junior",
		place: "Leveraged upside · loses first",
		net: "3.3× price",
	},
	{
		id: "middle",
		name: "Middle",
		place: "Loses second",
		net: "+12% / yr",
	},
	{
		id: "senior",
		name: "Senior",
		place: "Protected · loses last",
		net: "+7% / yr",
	},
];

/* ---------- Coupon model (RWA & price assets) — the main case ---------- */

export interface CouponRow {
	tranche: string;
	earns: string;
	up: string;
	down: string;
}

/**
 * NVDA pool of $10,000, split 30/30/40. Senior earns a fixed 7% coupon, middle
 * 12%, both funded by junior, which takes the leveraged price move. "Up" is a
 * +20% year, "down" a −20% year — senior and middle keep their coupon in both
 * because the junior+middle buffer absorbs the drop.
 */
export const COUPON_ROWS: readonly CouponRow[] = [
	{ tranche: "Senior", earns: "fixed coupon, capped upside", up: "+7%", down: "+7%" },
	{ tranche: "Middle", earns: "fixed coupon", up: "+12%", down: "+12%" },
	{ tranche: "Junior", earns: "leveraged price, pays the coupons", up: "+45%", down: "−88%" },
];

/* ---------- Fee model (liquid-staking tokens) — the second case ---------- */

export interface FeeRow {
	tranche: string;
	staking: string;
	fee: string;
	net: string;
}

/**
 * tsTON pool, base staking taken as 4.5% and senior paying a 2% protection fee
 * down to junior, on an even 20/20/60 split. Live pools show their own figures,
 * from the real split of deposits.
 */
export const FEE_ROWS: readonly FeeRow[] = [
	{ tranche: "Senior", staking: "+4.5%", fee: "−2.0%", net: "+2.5%" },
	{ tranche: "Middle", staking: "+4.5%", fee: "+0.2%", net: "+4.7%" },
	{ tranche: "Junior", staking: "+4.5%", fee: "+5.8%", net: "+10.3%" },
];

/* ---------- Holding the asset vs Resu (NVDA, coupon model) ---------- */

export interface CompareRow {
	who: string;
	ordinary: string;
	resu: string;
}

/** A +20% NVDA year — the upside is split, not shared. */
export const QUIET_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · junior", ordinary: "+20%", resu: "+45%" },
	{ who: "Balanced · middle", ordinary: "+20%", resu: "+12%" },
	{ who: "Cautious · senior", ordinary: "+20%", resu: "+7%" },
];

/** A −20% NVDA year — the loss walks up the queue from the bottom. */
export const LOSS_ROWS: readonly CompareRow[] = [
	{ who: "Yield chaser · junior", ordinary: "−20%", resu: "−88%" },
	{ who: "Balanced · middle", ordinary: "−20%", resu: "+12%" },
	{ who: "Cautious · senior", ordinary: "−20%", resu: "+7%" },
];
