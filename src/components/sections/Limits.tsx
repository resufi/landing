import { LIMITS } from "@/content/limits";
import { Section } from "../ui/Section";
import css from "./Limits.module.css";

export function Limits() {
	return (
		<Section
			kicker="What we do not promise"
			title="This section matters more than the one above it."
			lead="Staking today offers one risk profile and no choice about it — the same on every chain. We are adding the layer that was missing: a queue you pick your place in. It is new, so the honest thing is to show its edges before its APY."
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
