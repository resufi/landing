import { Eyebrow, Section, Text } from "@/components/ui";
import { STATS_LINK, STATS_NOTE, statsFrom } from "@/content/stats";
import { cx } from "@/lib/cx";
import { fetchStats } from "@/lib/onchain";
import css from "./Glance.module.css";
import { GlanceLive } from "./GlanceLive";

export async function Glance() {
	const stats = statsFrom(await fetchStats(process.env.TONCENTER_API_KEY));

	return (
		<Section id="glance">
			<Eyebrow>Protocol at a glance</Eyebrow>
			<div className={css.stats} id="stats">
				{stats.map((s) => (
					<div key={s.id} className={cx(css.stat, "stat")}>
						<div className={cx(css.num, "num")} data-id={s.id}>
							{s.value ?? "—"}
						</div>
						<div className={css.label}>{s.label}</div>
						<div className={css.hint}>{s.hint}</div>
					</div>
				))}
			</div>
			<Text>
				{STATS_NOTE}{" "}
				<a href={STATS_LINK.href} target="_blank" rel="noreferrer">
					{STATS_LINK.label}
				</a>
				.
			</Text>
			<GlanceLive initial={stats} />
		</Section>
	);
}
