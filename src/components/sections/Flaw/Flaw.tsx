import { Eyebrow, Heading, Section, Split, Table, Text } from "@/components/ui";
import { LOSS_ROWS, QUIET_ROWS, type CompareRow } from "@/content/tranches";

const HEAD = ["Depositor", "Just holding NVDA", "Resu"] as const;
const cells = (rows: readonly CompareRow[]) => rows.map((r) => [r.who, r.ordinary, r.resu]);

export function Flaw() {
	return (
		<Section id="flaw">
			<Split sceneId="waterFx">
				<Eyebrow>The flaw nobody names</Eyebrow>
				<Heading>Everywhere else, a gain and a loss are shared evenly.</Heading>
				<Text variant="lead">
					Hold a tokenized stock and a +20% year is +20% for everyone, a −20% year is −20%
					for everyone — nobody was ever asked which they wanted. At Resu the loss walks up
					the queue from the bottom and stops as soon as it is absorbed, and the same queue
					decides who keeps the most of the upside.
				</Text>
				<Text variant="note">
					A good year: NVDA +20%. Example pool of $10,000 split 30/30/40
					(junior/middle/senior), coupons senior 7% / middle 12%.
				</Text>
				<Table id="calmTbl" head={HEAD} rows={cells(QUIET_ROWS)} />
				<Text strong>
					Junior turns a +20% year into +45% — not from a new token and not from someone
					else&rsquo;s deposit, but because senior and middle take fixed coupons and junior
					takes the leveraged rest. Senior accepts a capped +7% in exchange for being
					protected, and that trade is the whole product.
				</Text>
				<Text variant="note">The year it goes wrong: NVDA −20% on the same pool.</Text>
				<Table id="stormTbl" head={HEAD} rows={cells(LOSS_ROWS)} />
				<Text strong>
					This is the bill for the line above, and junior pays it while the other two are
					untouched — they even keep their coupon, because the junior+middle buffer absorbs
					the fall before it ever reaches senior. Ordinary holders take the full −20% and
					were never offered the choice.
				</Text>
				<Text>
					Where does the money come from? From the asset itself, in one of two honest ways.
					For price assets — tokenized stocks like NVDA and MSFT, and ETH — senior earns a
					fixed coupon and junior takes the leveraged price. For liquid-staking tokens —
					JitoSOL, tsTON — senior instead pays a slice of the ordinary staking yield down to
					junior. Same loss queue; the yield just comes from a different place. No new token
					funds it, and no promise stands behind it.
				</Text>
			</Split>
		</Section>
	);
}
