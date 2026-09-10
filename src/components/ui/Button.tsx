import type { AnchorHTMLAttributes } from "react";
import css from "./Button.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	/** solid — единственное главное действие; ghost — всё, что рядом с ним. */
	variant?: "solid" | "ghost";
	size?: "md" | "lg";
	/** Ссылка наружу открывается в новой вкладке и получает rel сама. */
	external?: boolean;
}

/**
 * Кнопка на странице всегда ссылка: никакого другого действия здесь нет.
 * Отдельный компонент нужен ровно чтобы не забыть rel="noopener" — на
 * прошлой странице ссылок в приложение было пять.
 */
export function Button({
	variant = "solid",
	size = "md",
	external = false,
	className = "",
	children,
	...rest
}: Props) {
	const cls = [css.btn, css[variant], css[size], className]
		.filter(Boolean)
		.join(" ");

	return (
		<a
			className={cls}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			{...rest}
		>
			{children}
		</a>
	);
}
