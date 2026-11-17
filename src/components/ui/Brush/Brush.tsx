import { cx } from "@/lib/cx";
import css from "./Brush.module.css";

const STROKES = [
	"M2 7C40 4 80 8 120 6S200 5 238 6",
	"M2 6C50 8 90 4 130 6S205 7 238 5",
	"M2 6C45 5 95 8 135 6S200 4 238 6",
	"M2 7C40 5 85 7 125 6S205 6 238 7",
] as const;

export function Brush({ variant = 0 }: { variant?: 0 | 1 | 2 | 3 }) {
	return (
		<div className={cx(css.brush, "brush")} aria-hidden="true">
			<svg viewBox="0 0 240 12" preserveAspectRatio="none">
				<path className={css.stroke} pathLength={1} d={STROKES[variant]} />
			</svg>
		</div>
	);
}
