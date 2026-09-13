import type { ReactNode } from "react";
import css from "./Section.module.css";

interface Props {
	id?: string;
	kicker: string;
	title?: ReactNode;
	lead?: ReactNode;
	tone?: "light" | "dark";
	children?: ReactNode;
}

export function Section({
	id,
	kicker,
	title,
	lead,
	tone = "light",
	children,
}: Props) {
	return (
		<section id={id} className={`${css.section} ${css[tone]}`}>
			<div className={css.wrap}>
				<p className={css.kicker}>{kicker}</p>
				{title ? <h2 className={css.title}>{title}</h2> : null}
				{lead ? <p className={css.lead}>{lead}</p> : null}
				{children}
			</div>
		</section>
	);
}
