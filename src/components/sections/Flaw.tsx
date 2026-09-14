import { LOSS_ROWS, QUIET_ROWS, type CompareRow } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import css from "./Prose.module.css";

const COLUMNS: readonly Column<CompareRow>[] = [
	{ key: "who", header: "Depositor", cell: (r) => r.who },
	{
		key: "ordinary",
		header: "Ordinary liquid staking",
		numeric: true,
		cell: (r) => r.ordinary,
	},
	{ key: "resu", header: "Resu", numeric: true, cell: (r) => r.resu },
];

export function Flaw() {
	return (
		<Section
			id="how"
			kicker="The flaw nobody names"
			title="Everywhere else, a loss is split evenly."
			lead="Lose 10% of the pool and everyone loses 10% — nobody was ever asked. At Resu the loss walks up the queue from the bottom and stops as soon as it has been absorbed. The same queue decides who gets paid the most in every year it does not happen."
		>
			<DataTable
				caption="Most years: nothing goes wrong. Base staking taken as 4.5% for the example."
				columns={COLUMNS}
				rows={QUIET_ROWS}
			/>

			<p className={css.p}>
				Junior more than doubles the plain staking rate — not from a new token
				and not from someone else&rsquo;s deposit, but because senior pays for
				the right to stand behind it. That payment is the whole product, and it
				arrives every single year.
			</p>

			<DataTable
				caption="The year it goes wrong: a 500-coin loss on a 10,000-coin pool (junior 2,000 · middle 2,000 · senior 6,000)."
				columns={COLUMNS}
				rows={LOSS_ROWS}
			/>

			<p className={css.p}>
				This is the bill for the line above, and junior pays it in full while
				the other two are untouched. The loss is shown on its own — the year
				also carried junior&rsquo;s +10.3%, so the two net out to roughly −15%.
				Ordinary staking hands everyone −5% and never offered the choice.
			</p>

			<p className={css.pMuted}>
				Where does the money come from? From one honest place and no other: the
				ordinary 4–5% staking yield. You deposit a staking token you already
				hold — tsTON on TON, JitoSOL on Solana. It appreciates on its own, and
				that growth reaches every depositor automatically. No oracle, no keeper,
				nothing that can fail to credit you.
			</p>
		</Section>
	);
}
