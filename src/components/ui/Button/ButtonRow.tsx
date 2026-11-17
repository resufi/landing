import type { ReactNode } from "react";
import { cx, REVEAL } from "@/lib/cx";
import css from "./ButtonRow.module.css";

interface Props {
	center?: boolean;
	reveal?: boolean;
	children: ReactNode;
}

export function ButtonRow({ center, reveal = true, children }: Props) {
	return (
		<div className={cx(css.row, center && css.center, reveal && REVEAL)}>{children}</div>
	);
}
