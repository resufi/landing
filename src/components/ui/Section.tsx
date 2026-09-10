import type { ReactNode } from "react";
import css from "./Section.module.css";

interface Props {
	id?: string;
	/** Надзаголовок моноширинными капсом — он же оглавление секции. */
	kicker: string;
	/** У блока цифр заголовка нет: надзаголовок там и есть заголовок. */
	title?: ReactNode;
	lead?: ReactNode;
	/** Тёмная полоса. На странице их ровно две: цифры и финальный призыв. */
	tone?: "light" | "dark";
	children?: ReactNode;
}

/**
 * Каркас секции. Существует затем, чтобы вертикальный ритм задавался в одном
 * месте: восемь секций, каждая со своими отступами, разъезжаются на третьей.
 */
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
