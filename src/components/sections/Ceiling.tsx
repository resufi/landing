import { WATERFALL_ROWS } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import css from "./Prose.module.css";

type Row = (typeof WATERFALL_ROWS)[number];

const COLUMNS: readonly Column<Row>[] = [
	{ key: "loss", header: "Loss on a 10,000-coin pool", cell: (r) => r.loss },
	{
		key: "junior",
		header: "Junior 2,000",
		numeric: true,
		cell: (r) => r.junior,
	},
	{
		key: "middle",
		header: "Middle 2,000",
		numeric: true,
		cell: (r) => r.middle,
	},
	{
		key: "senior",
		header: "Senior 6,000",
		numeric: true,
		cell: (r) => r.senior,
	},
];

export function Ceiling() {
	return (
		<Section
			id="ceiling"
			kicker="Protection by arithmetic"
			title="The contract cannot write off more than 30%."
			lead={
				<>
					Not “will try not to” — cannot. A larger write-off is rejected
					outright. And from that one limit follows the most interesting
					property in the protocol.
				</>
			}
		>
			<DataTable
				columns={COLUMNS}
				rows={WATERFALL_ROWS}
				footNote="Anything larger is rejected by the contract."
			/>

			<p className={css.p}>
				Junior plus middle here is 4,000, and the ceiling is 3,000. The loss
				simply cannot reach senior. That is not a blog promise — it is
				arithmetic anyone can check against the code.
			</p>
			<p className={css.pSmall}>
				Two practical details: a loss reduces the price of a share, not the
				number of shares, so applying it costs one operation whether there are
				ten depositors or a hundred thousand. And exiting takes three days,
				priced at settlement rather than at request, so nobody can spot trouble
				coming and jump the queue.
			</p>
		</Section>
	);
}
