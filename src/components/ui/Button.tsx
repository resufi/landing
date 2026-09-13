import type { AnchorHTMLAttributes } from "react";
import css from "./Button.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?: "solid" | "ghost";
	size?: "md" | "lg";
	external?: boolean;
}

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
