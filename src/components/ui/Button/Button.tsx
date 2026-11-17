import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import css from "./Button.module.css";

interface Props {
	href: string;
	variant?: "primary" | "ghost";
	external?: boolean;
	pinned?: boolean;
	id?: string;
	children: ReactNode;
}

export function Button({ href, variant = "primary", external, pinned, id, children }: Props) {
	return (
		<a
			id={id}
			href={href}
			className={cx(css.button, css[variant], pinned && css.pinned)}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{children}
		</a>
	);
}
