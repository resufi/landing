import type { ReactNode } from "react";
import { cx, REVEAL } from "@/lib/cx";
import css from "./Eyebrow.module.css";

export function Eyebrow({ children }: { children: ReactNode }) {
	return <div className={cx(css.eyebrow, REVEAL)}>{children}</div>;
}
