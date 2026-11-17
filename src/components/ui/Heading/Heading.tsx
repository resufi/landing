import type { ReactNode } from "react";
import { cx, REVEAL } from "@/lib/cx";
import css from "./Heading.module.css";

interface Props {
	size?: "big" | "mid" | "final";
	children: ReactNode;
}

export function Heading({ size = "mid", children }: Props) {
	return <h2 className={cx(css.heading, css[size], REVEAL)}>{children}</h2>;
}
