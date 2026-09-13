import { YIELD_ROWS } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import prose from "./Prose.module.css";

type Row = (typeof YIELD_ROWS)[number];

const COLUMNS: readonly Column<Row>[] = [
	{ key: "tranche", header: "Tranche", cell: (r) => r.tranche },
	{ key: "staking", header: "Staking gives", numeric: true, cell: (r) => r.staking },
	{ key: "fee", header: "Protection fee", numeric: true, cell: (r) => r.fee },
	{ key: "net", header: "Net for the year", numeric: true, cell: (r) => r.net },
];

export function Tranches() {
	return (
		<Section
			id="tranches"
			kicker="Three seats in one queue"
			title="Whoever takes on someone else’s risk gets paid for it."
			lead="Money inside the pool flows top down — from the protected to the protector. Senior pays 2% a year of its own deposit; junior receives it; middle sits between, collecting a little because it is second in line rather than out of line."
		>
			<DataTable
				caption="A year with nothing going wrong, base staking taken as 4.5% for the example."
				columns={COLUMNS}
				rows={YIELD_ROWS}
			/>

			<p className={prose.p}>
				Senior earns less than plain staking. That is not a defect — it is the
				price of insurance, and we do not yet know whether people will pay it.
				That is exactly what the launch is for.
			</p>
		</Section>
	);
}
