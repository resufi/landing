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
			<Eyebrow>Risk-curated staking on EVM and non-EVM chains</Eyebrow>
			<Heading size="big">Choose where you stand in the loss queue.</Heading>
			<Text variant="lead">
				Everywhere else a loss is split evenly — the cautious saver and the yield chaser
				lose the same 10%. Resu changes exactly one thing, and it changes everything.
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
				No token of our own. No points. No promised APY — just ordinary staking yield,
				divided differently. Live across six chains, EVM and non-EVM, and the list will
				only grow: the mechanism is arithmetic, and arithmetic ports anywhere there is an
				asset to build on.
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
