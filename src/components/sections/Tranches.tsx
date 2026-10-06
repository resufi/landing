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
				caption="A year with nothing going wrong, base staking taken as 4.5% and an even 20/20/60 junior/middle/senior split for the example. Live pools show their own figures, computed from the real split of deposits."
				columns={COLUMNS}
				rows={YIELD_ROWS}
			/>

			<p className={prose.p}>
				Senior earns less than plain staking. That is not a defect — it is the
				price of insurance, and we do not yet know whether people will pay it.
				That is exactly what the launch is for.
			</p>

			<p className={prose.p}>
				On price-based pools — tokenized stocks and WETH on our EVM chains — the
				model flips. The asset earns nothing on its own, so the value comes from
				price: senior takes a fixed coupon, middle a smaller one, and junior the
				leveraged price move, with its downside still capped at its own stake.
				Same loss queue, the yield just comes from a different place.
			</p>
		</Section>
	);
}
