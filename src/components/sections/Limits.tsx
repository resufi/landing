import { LIMITS } from "@/content/limits";
import { Section } from "../ui/Section";
import css from "./Limits.module.css";

/**
 * Границы. Список нарочно плоский, без карточек: обещания в рамочках
 * читаются как достоинства, а это не они.
 */
export function Limits() {
	return (
		<Section
			kicker="What we do not promise"
			title="This section matters more than the one above it."
			lead="If we are honest here, the rest can be believed. Where others show an APY, we show the edges."
		>
			<dl className={css.list}>
				{LIMITS.map((l) => (
					<div key={l.title} className={css.row}>
						<dt className={css.term}>{l.title}</dt>
						<dd className={css.desc}>{l.body}</dd>
					</div>
				))}
			</dl>
		</Section>
	);
}
