export interface Limit {
	title: string;
	body: string;
}

export const LIMITS: readonly Limit[] = [
	{
		title: "No specific rate",
		body:
			"The base staking yield is not ours and we do not steer it. The interface " +
			'says "−2% to base", not "3.7% a year". Any precise number would be a lie.',
	},
	{
		title: "Not protection from everything",
		body:
			"The ceiling is 30%. Beyond it, losses stay with depositors. We cover an " +
			"ordinary disaster, not the end of the world. And not the market either: " +
			"if the staking token falls against the dollar, every tranche falls with " +
			"it. The queue orders losses inside the pool, not the price outside it.",
	},
	{
		title: "Junior can lose everything",
		body:
			'Not an "aggressive strategy" — literally: in a large incident junior goes ' +
			"to zero first and completely. The higher yield is payment for exactly that.",
	},
	{
		title: "We do not know the right price",
		body:
			"The 2% fee comes from general hack statistics and from the one working " +
			"insurer in the industry. Nobody has priced graded staking risk before — " +
			"there is no history to read it off, on any chain. The market will set it.",
	},
	{
		title: "The protocol has no revenue",
		body:
			"There is no fee mechanism at all. That is deliberate and temporary — an " +
			"extra fee now would only distort the answer we are trying to get.",
	},
];
