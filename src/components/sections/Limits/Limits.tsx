import { Eyebrow, Heading, Section, Text } from "@/components/ui";
import { LIMITS } from "@/content/limits";
import { cx } from "@/lib/cx";
import css from "./Limits.module.css";

function Crack() {
	return (
		<svg
			className={cx(css.crack, "crack")}
			preserveAspectRatio="none"
			viewBox="0 0 1000 16"
			aria-hidden="true"
		/>
	);
}

export function Limits() {
	return (
		<Section id="promise">
			<Eyebrow>What we do not promise</Eyebrow>
			<Heading>This section matters more than the one above it.</Heading>
			<Text variant="lead">
				On-chain, every asset offers one risk profile and no choice about it — the same on
				every chain. We are adding the layer that was missing: a queue you pick your place
				in. It is new, so the honest thing is to show its edges before its upside.
			</Text>
			<div className={css.list} id="kin">
				{LIMITS.map((l) => (
					<div key={l.title} className={cx(css.row, "kr")}>
						<Crack />
						<h4 className={css.title}>{l.title}</h4>
						<p className={css.body}>{l.body}</p>
					</div>
				))}
				<div className={cx(css.row, css.last, "kr")}>
					<Crack />
				</div>
			</div>
		</Section>
	);
}
