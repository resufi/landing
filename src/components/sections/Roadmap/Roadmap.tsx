import { Eyebrow, Heading, Section } from "@/components/ui";
import { ROADMAP, type Stage } from "@/content/roadmap";
import { cx } from "@/lib/cx";
import css from "./Roadmap.module.css";

const STATE: Record<Stage, "done" | "now" | "later"> = {
	done: "done",
	now: "now",
	next: "later",
};

export function Roadmap() {
	return (
		<Section id="roadmap">
			<svg className={css.soil} id="soilFx" preserveAspectRatio="none" aria-hidden="true" />
			<Eyebrow>Roadmap</Eyebrow>
			<Heading>What is done, what is being done, what is honestly not.</Heading>
			<div className={css.roots} id="roots">
				<svg className={css.rootsFx} id="rootsFx" aria-hidden="true" />
				{ROADMAP.map((m) => (
					<div key={m.title} className={cx(css.milestone, "rm")} data-s={STATE[m.stage]}>
						<div className={css.when}>{m.when}</div>
						<h3 className={css.title}>{m.title}</h3>
						<p className={css.body}>{m.body}</p>
					</div>
				))}
			</div>
		</Section>
	);
}
