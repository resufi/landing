import type { ReactNode } from "react";
import { cx, REVEAL } from "@/lib/cx";
import css from "./Text.module.css";

interface Props {
	variant?: "lead" | "body" | "note" | "fine";
	strong?: boolean;
	className?: string;
	children: ReactNode;
}

export function Text({ variant = "body", strong, className, children }: Props) {
	return (
		<p className={cx(css[variant], strong && css.strong, REVEAL, className)}>{children}</p>
	);
}
