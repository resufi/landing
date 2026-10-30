export interface Limit {
	title: string;
	body: string;
}

export const LIMITS: readonly Limit[] = [
	{
		title: "No single promised rate",
		body:
			"On price assets senior earns a fixed coupon, but junior's return rides " +
			"the asset's price and nobody can promise that. On staking pools the base " +
			"yield is not ours to steer. We show the mechanism and the live split, not " +
			"a guaranteed APY — any precise number would be a lie.",
	},
	{
		title: "Not protection from everything",
		body:
			"The buffer is finite. A drawdown larger than junior plus middle reaches " +
			"senior, and beyond the pool's cap the loss stays with depositors. And on " +
			"staking pools, if the token falls against the dollar every tier falls " +
			"with it: the queue orders losses inside the pool, not the price outside it.",
	},
	{
		title: "Junior can lose everything",
		body:
			'Not an "aggressive strategy" — literally: in a large drawdown junior goes ' +
			"to zero first and completely. Its higher yield, and its leverage on price, " +
			"are payment for exactly that.",
	},
	{
		title: "We do not know the right price",
		body:
			"Nobody has priced graded on-chain risk before. The coupons and the 2% " +
			"protection fee come from market comparables and the few working insurers " +
			"in the industry — there is no long history to read them off. The market " +
			"will set them.",
	},
	{
		title: "The protocol takes little, for now",
		body:
			"Today almost all of the coupon and protection-fee flow moves between " +
			"depositors, not to us — deliberately, so the launch answers one clean " +
			"question first. A modest protocol share, and the $RESU token with its " +
			"activity points, come later: paid for work done, not for holding coins.",
	},
];
