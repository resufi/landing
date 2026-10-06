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
			"redesign. Live on six chains — TON, Solana, HyperEVM, Robinhood, " +
			"Arbitrum and Base — EVM and non-EVM alike.",
	},
	{
		stage: "next",
		when: "Later",
		title: "Revenue for the protocol",
		body:
			"Today there is not a single protocol fee in the contracts: 100% of the " +
			"protection fee moves between depositors and none of it reaches us. When " +
			"the time comes, the fairest cut is a share of that fee — paid for work " +
			"actually done, not for holding coins.",
	},
];
