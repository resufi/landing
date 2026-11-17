import { Eyebrow, Heading, Section, Split, Table, Text } from "@/components/ui";
import { YIELD_ROWS } from "@/content/tranches";

const HEAD = ["Tranche", "Staking gives", "Protection fee", "Net for the year"] as const;

export function Seats() {
	return (
		<Section id="seats">
			<Split sceneId="cascadeFx">
				<Eyebrow>Three seats in one queue</Eyebrow>
				<Heading>Whoever takes on someone else&rsquo;s risk gets paid for it.</Heading>
				<Text variant="lead">
					Money inside the pool flows top down — from the protected to the protector.
					Senior pays 2% a year of its own deposit; junior receives it; middle sits
					between, collecting a little because it is second in line rather than out of
					line.
				</Text>
				<Text variant="note">
					A year with nothing going wrong, base staking taken as 4.5% and an even 20/20/60
					junior/middle/senior split for the example. Live pools show their own figures,
					computed from the real split of deposits.
				</Text>
				<Table
					dense
					head={HEAD}
					rows={YIELD_ROWS.map((r) => [r.tranche, r.staking, r.fee, r.net])}
				/>
				<Text strong>
					Senior earns less than plain staking. That is not a defect — it is the price of
					insurance, and we do not yet know whether people will pay it. That is exactly
					what the launch is for.
				</Text>
				<Text strong>
					On price-based pools — tokenized stocks and WETH on our EVM chains — the model
					flips. The asset earns nothing on its own, so the value comes from price: senior
					takes a fixed coupon, middle a smaller one, and junior the leveraged price move,
					with its downside still capped at its own stake. Same loss queue, the yield just
					comes from a different place.
				</Text>
			</Split>
		</Section>
	);
}
