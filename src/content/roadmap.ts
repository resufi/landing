/**
 * Роадмап.
 *
 * Два последних пункта — это признания из раздела «чего мы не обещаем»,
 * переписанные как план. Незакрытую дыру честнее показать сроком, чем
 * промолчать о ней: промолчавших на этом рынке уже достаточно.
 */
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
		stage: "next",
		when: "Next",
		title: "Oracle coverage, sold to the first counterparty",
		body:
			"Double-signature proof against Pyth, live policies, premiums flowing to " +
			"junior. First candidate is Syde — our own protocol, because we would " +
			"rather test on ourselves.",
	},
	{
		stage: "next",
		when: "Next",
		title: "Capital locked under active policies",
		body:
			"Today the three-day exit window slows depositors leaving from under " +
			"sold coverage but does not forbid it. The real fix — locking the " +
			"backing capital — is named in our limits, and it is next.",
	},
	{
		stage: "next",
		when: "Later",
		title: "Revenue for the protocol",
		body:
			"Today there is not a single protocol fee in the contracts: 100% of the " +
			"protection fee moves between depositors, 100% of premiums go to the " +
			"pool. When the time comes, the fairest cut is a share of premiums — " +
			"paid for work actually done, not for holding coins.",
	},
];
