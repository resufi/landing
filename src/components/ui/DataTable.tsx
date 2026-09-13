import type { ReactNode } from "react";
import css from "./DataTable.module.css";

export interface Column<Row> {
	key: string;
	header: string;
	numeric?: boolean;
	cell: (row: Row) => ReactNode;
}

interface Props<Row> {
	caption?: ReactNode;
	columns: readonly Column<Row>[];
	rows: readonly Row[];
	footNote?: ReactNode;
}

export function DataTable<Row>({
	caption,
	columns,
	rows,
	footNote,
}: Props<Row>) {
	return (
		<div className={css.scroll}>
			<table className={css.table}>
				{caption ? <caption className={css.caption}>{caption}</caption> : null}
				<thead>
					<tr>
						{columns.map((c) => (
							<th key={c.key} className={c.numeric ? css.numeric : undefined}>
								{c.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i}>
							{columns.map((c) => (
								<td
									key={c.key}
									className={c.numeric ? `${css.numeric} num` : undefined}
								>
									{c.cell(row)}
								</td>
							))}
						</tr>
					))}
					{footNote ? (
						<tr>
							<td className={css.foot} colSpan={columns.length}>
								{footNote}
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</div>
	);
}
