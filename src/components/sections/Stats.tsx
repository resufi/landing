import { STATS, STATS_NOTE } from "@/content/stats";
import { Section } from "../ui/Section";
import css from "./Stats.module.css";

export function Stats() {
	return (
		<Section kicker="Protocol at a glance" tone="dark">
			<dl className={css.grid}>
				{STATS.map((s) => (
					<div key={s.id} className={css.cell}>
						<dd className={`${css.value} num ${s.value ? "" : css.pending}`}>
							{s.value ?? "—"}
						</dd>
						<dt className={css.label}>{s.label}</dt>
					</div>
				))}
			</dl>
			<p className={css.note}>{STATS_NOTE}</p>
		</Section>
	);
}
