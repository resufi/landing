import { COMPARE_ROWS } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import css from "./Prose.module.css";

type Row = (typeof COMPARE_ROWS)[number];

const COLUMNS: readonly Column<Row>[] = [
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
			lead="Lose 10% of the pool and everyone loses 10% — nobody was ever asked. At Resu the loss walks up the queue from the bottom and stops as soon as it has been absorbed."
		>
			<DataTable
				caption="A 500-coin loss on a 10,000-coin pool (junior 2,000 · middle 2,000 · senior 6,000)."
				columns={COLUMNS}
				rows={COMPARE_ROWS}
			/>

			<p className={css.p}>
				Where does the money come from? From one honest place and no other: the
				ordinary 4–5% staking yield. You deposit an existing staking token such
				as tsTON; it appreciates against GRAM on its own, and that growth reaches
				every depositor automatically. No oracle, no keeper, nothing that can
				fail to credit you.
			</p>
		</Section>
	);
}
