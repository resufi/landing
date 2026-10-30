import { COUPON_ROWS, FEE_ROWS, type CouponRow, type FeeRow } from "@/content/tranches";
import { DataTable, type Column } from "../ui/DataTable";
import { Section } from "../ui/Section";
import prose from "./Prose.module.css";

const COUPON_COLUMNS: readonly Column<CouponRow>[] = [
	{ key: "tranche", header: "Tranche", cell: (r) => r.tranche },
	{ key: "earns", header: "What it earns", cell: (r) => r.earns },
	{ key: "up", header: "NVDA +20%", numeric: true, cell: (r) => r.up },
	{ key: "down", header: "NVDA −20%", numeric: true, cell: (r) => r.down },
];

const FEE_COLUMNS: readonly Column<FeeRow>[] = [
	{ key: "tranche", header: "Tranche", cell: (r) => r.tranche },
	{ key: "staking", header: "Staking gives", numeric: true, cell: (r) => r.staking },
	{ key: "fee", header: "Protection fee", numeric: true, cell: (r) => r.fee },
	{ key: "net", header: "Net for the year", numeric: true, cell: (r) => r.net },
];

export function Tranches() {
	return (
		<Section
			id="tranches"
			kicker="Three seats in one queue, two ways to earn"
			title="Whoever takes on someone else’s risk gets paid for it."
			lead="The product leads with real-world assets — tokenized stocks and ETH — and the same engine also tranches liquid-staking tokens. Both share one loss queue; only the source of the yield differs."
		>
			<p className={prose.p}>
				<b>Price assets (the main case).</b> On tokenized stocks and ETH the asset
				earns nothing on its own, so the value comes from price. Senior takes a
				fixed coupon, middle a larger one, and junior the leveraged price move —
				its downside still capped at its own stake. Senior&rsquo;s upside is
				capped in return for being protected.
			</p>

			<DataTable
				caption="NVDA pool, 30/30/40 split, coupons senior 7% / middle 12%. Senior and middle keep their coupon in both a +20% and a −20% year; junior takes the leveraged rest."
				columns={COUPON_COLUMNS}
				rows={COUPON_ROWS}
			/>

			<p className={prose.p}>
				<b>Staking tokens (the second case).</b> On liquid-staking tokens the
				model flips: the asset appreciates on its own, so senior pays 2% a year
				of its own deposit as the price of protection, junior receives it, and
				middle sits between. Same queue, income instead of a coupon.
			</p>

			<DataTable
				caption="A quiet year, base staking taken as 4.5% and an even 20/20/60 split for the example. Live pools show their own figures, computed from the real split of deposits."
				columns={FEE_COLUMNS}
				rows={FEE_ROWS}
			/>

			<p className={prose.p}>
				Senior earns less than simply holding the asset. That is not a defect —
				it is the price of protection, and whether people will pay it is exactly
				what the launch is for.
			</p>
		</Section>
	);
}
