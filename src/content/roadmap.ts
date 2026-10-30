export type Stage = "done" | "now" | "next";

export interface Milestone {
	stage: Stage;
	when: string;
	title: string;
	body: string;
}

export const ROADMAP: readonly Milestone[] = [
	{
		stage: "done",
		when: "Shipped",
		title: "Tranche core and the loss ceiling",
		body:
			"Three tranches, top-down fee flow, bottom-up loss absorption, the hard " +
			"30% write-off limit and the three-day exit priced at settlement. " +
			"Covered by tests.",
	},
	{
		stage: "done",
		when: "Shipped",
		title: "App and testnet pool",
		body:
			"Deposit, withdraw and the loss waterfall in the interface, wallet " +
			"connection, a live pool to try the mechanics against.",
	},
	{
		stage: "now",
		when: "In progress",
		title: "Audit and mainnet launch",
		body:
			"External review of the contracts, then the first real pool with " +
			"deliberately small caps. The question the launch answers: will anyone " +
			"buy senior at 2% a year.",
	},
	{
		stage: "done",
		when: "Shipped",
		title: "More chains, same arithmetic",
		body:
			"The mechanism is arithmetic, so each chain is a deployment, not a " +
			"redesign. Live on seven chains — Base, Arbitrum, Robinhood, HyperEVM, " +
			"Monad, Solana and TON — EVM and non-EVM alike.",
	},
	{
		stage: "next",
		when: "Later",
		title: "Revenue for the protocol",
		body:
			"Today almost all of the coupon and protection-fee flow moves between " +
			"depositors, not to us. The $RESU token and its activity points are the " +
			"user-and-investor layer; a modest protocol share of the fee comes later — " +
			"the fairest cut, paid for work actually done, not for holding coins.",
	},
];
