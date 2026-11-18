import { Eyebrow, Heading, Section, Split, Table, Text } from "@/components/ui";
import { COUPON_ROWS, FEE_ROWS } from "@/content/tranches";

const COUPON_HEAD = ["Tranche", "What it earns", "NVDA +20%", "NVDA −20%"] as const;
const FEE_HEAD = ["Tranche", "Staking gives", "Protection fee", "Net for the year"] as const;

export function Seats() {
	return (
		<Section id="seats">
			<Split sceneId="cascadeFx">
				<Eyebrow>Three seats in one queue, two ways to earn</Eyebrow>
				<Heading>Whoever takes on someone else&rsquo;s risk gets paid for it.</Heading>
				<Text variant="lead">
					The product leads with real-world assets — tokenized stocks and ETH — and the
					same engine also tranches liquid-staking tokens. Both share one loss queue; only
					the source of the yield differs.
				</Text>

				<Text strong>
					Price assets (the main case). On tokenized stocks and ETH the asset earns nothing
					on its own, so the value comes from price. Senior takes a fixed coupon, middle a
					larger one, and junior the leveraged price move — its downside still capped at its
					own stake. Senior&rsquo;s upside is capped in return for being protected.
				</Text>
				<Text variant="note">
					NVDA pool, 30/30/40 split, coupons senior 7% / middle 12%. Senior and middle keep
					their coupon in both a +20% and a −20% year; junior takes the leveraged rest.
				</Text>
				<Table
					dense
					head={COUPON_HEAD}
					rows={COUPON_ROWS.map((r) => [r.tranche, r.earns, r.up, r.down])}
				/>

				<Text strong>
					Staking tokens (the second case). On liquid-staking tokens the model flips: the
					asset appreciates on its own, so senior pays 2% a year of its own deposit as the
					price of protection, junior receives it, and middle sits between. Same queue,
					income instead of a coupon.
				</Text>
				<Text variant="note">
					A quiet year, base staking taken as 4.5% and an even 20/20/60 split for the
					example. Live pools show their own figures, computed from the real split of
					deposits.
				</Text>
				<Table
					dense
					head={FEE_HEAD}
					rows={FEE_ROWS.map((r) => [r.tranche, r.staking, r.fee, r.net])}
				/>

				<Text strong>
					Senior earns less than simply holding the asset. That is not a defect — it is the
					price of protection, and whether people will pay it is exactly what the launch is
					for.
				</Text>
			</Split>
		</Section>
	);
}
