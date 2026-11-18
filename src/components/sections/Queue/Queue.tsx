import { Button, ButtonRow, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { TRANCHES } from "@/content/tranches";
import { APP_URL } from "@/lib/config";
import { cx } from "@/lib/cx";
import css from "./Queue.module.css";

const rate = (net: string) => Number(net.match(/[\d.]+/)?.[0] ?? 0);

export function Queue() {
	return (
		<Section id="queue">
			<svg className={css.fx} id="queueFx" aria-hidden="true" />
			<Eyebrow>On-chain risk tiers for real-world assets — and ETH, staking tokens and more</Eyebrow>
			<Heading size="big">Choose your risk on any asset.</Heading>
			<Text variant="lead">
				Everywhere else a gain and a loss are shared evenly — the cautious saver and the
				yield chaser get the same number. Resu lets each pick a tier instead: protected and
				steady, or aggressive and high-upside.
			</Text>
			<ButtonRow>
				<Button href={APP_URL} external>
					Open app
				</Button>
				<Button href="#seats" variant="ghost">
					See how it works
				</Button>
			</ButtonRow>
			<Text variant="fine">
				Built first for tokenized real-world assets — and just as at home with ETH, staking
				tokens and yield-bearing stablecoins. Live across seven chains, EVM and non-EVM, with
				an activity-points program toward the future $RESU token. The mechanism is
				arithmetic, and it ports anywhere there is an asset to build on.
			</Text>
			<div className={css.bars} id="bars" aria-label="Loss queue">
				{TRANCHES.map((t, i) => (
					<div key={t.id} className={cx(css.row, "bar-row")} data-v={rate(t.net)}>
						<span className={css.place}>{t.place}</span>
						<div className={cx(css.bar, css[`t${i + 1}`], "bar")}>
							<i className={cx(css.fill, "fill")} />
							<b className={css.name}>{t.name}</b>
						</div>
						<span className={cx(css.value, "bv")}>
							<em>~0.0%</em> a year
						</span>
					</div>
				))}
			</div>
		</Section>
	);
}
