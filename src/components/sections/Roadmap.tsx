import { ROADMAP } from "@/content/roadmap";
import { Section } from "../ui/Section";
import css from "./Roadmap.module.css";

export function Roadmap() {
	return (
		<Section
			id="roadmap"
			kicker="Roadmap"
			title="What is done, what is being done, what is honestly not."
		>
			<ol className={css.road}>
				{ROADMAP.map((m) => (
					<li key={m.title} className={css.item} data-stage={m.stage}>
						<p className={css.when}>{m.when}</p>
						<h3 className={css.title}>{m.title}</h3>
						<p className={css.body}>{m.body}</p>
					</li>
				))}
			</ol>
		</Section>
	);
}
