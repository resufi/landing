import type { ReactNode } from "react";
import { cx, REVEAL } from "@/lib/cx";
import css from "./Table.module.css";

interface Props {
	id?: string;
	head: readonly string[];
	rows: readonly (readonly ReactNode[])[];
	dense?: boolean;
}

export function Table({ id, head, rows, dense }: Props) {
	return (
		<table id={id} className={cx(css.table, dense && css.dense, REVEAL)}>
			<thead>
				<tr>
					{head.map((h) => (
						<th key={h}>{h}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((r, i) => (
					<tr key={i}>
						{r.map((c, j) => (
							<td key={j}>{c}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
