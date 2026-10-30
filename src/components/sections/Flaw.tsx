import { LOSS_ROWS, QUIET_ROWS, type CompareRow } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import css from "./Prose.module.css";

const COLUMNS: readonly Column<CompareRow>[] = [
	{ key: "who", header: "Depositor", cell: (r) => r.who },
	{
		key: "ordinary",
		header: "Just holding NVDA",
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
			title="Everywhere else, a gain and a loss are shared evenly."
			lead="Hold a tokenized stock and a +20% year is +20% for everyone, a −20% year is −20% for everyone — nobody was ever asked which they wanted. At Resu the loss walks up the queue from the bottom and stops as soon as it is absorbed, and the same queue decides who keeps the most of the upside."
		>
			<DataTable
				caption="A good year: NVDA +20%. Example pool of $10,000 split 30/30/40 (junior/middle/senior), coupons senior 7% / middle 12%."
				columns={COLUMNS}
				rows={QUIET_ROWS}
			/>

			<p className={css.p}>
				Junior turns a +20% year into +45% — not from a new token and not from
				someone else&rsquo;s deposit, but because senior and middle take fixed
				coupons and junior takes the leveraged rest. Senior accepts a capped +7%
				in exchange for being protected, and that trade is the whole product.
			</p>

			<DataTable
				caption="The year it goes wrong: NVDA −20% on the same pool."
				columns={COLUMNS}
				rows={LOSS_ROWS}
			/>

			<p className={css.p}>
				This is the bill for the line above, and junior pays it while the other
				two are untouched — they even keep their coupon, because the
				junior+middle buffer absorbs the fall before it ever reaches senior.
				Ordinary holders take the full −20% and were never offered the choice.
			</p>

			<p className={css.pMuted}>
				Where does the money come from? From the asset itself, in one of two
				honest ways. For price assets — tokenized stocks like NVDA and MSFT, and
				ETH — senior earns a fixed coupon and junior takes the leveraged price.
				For liquid-staking tokens — JitoSOL, tsTON — senior instead pays a slice
				of the ordinary staking yield down to junior. Same loss queue; the yield
				just comes from a different place. No new token funds it, and no promise
				stands behind it.
			</p>
		</Section>
	);
}
