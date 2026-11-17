import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import css from "./Section.module.css";

interface Props {
	id: string;
	className?: string;
	children: ReactNode;
}

export function Section({ id, className, children }: Props) {
	return (
		<section id={id} className={cx(css.section, className)}>
			{children}
		</section>
	);
}
