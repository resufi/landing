"use client";

import { useEffect, useState } from "react";
import { STATS_LINK, STATS_NOTE, statsFrom, type Stat } from "@/content/stats";
import { fetchStats } from "@/lib/onchain";
import css from "./Stats.module.css";

export function StatsGrid({ initial }: { initial: readonly Stat[] }) {
	const [stats, setStats] = useState(initial);

	useEffect(() => {
		let alive = true;
		void fetchStats(undefined, { depositors: false }).then((live) => {
			if (!alive) return;
			const next = statsFrom(live);
			setStats((prev) =>
				prev.map((old) => {
					const fresh = next.find((n) => n.id === old.id);
					return fresh?.value === undefined ? old : fresh;
				}),
			);
		});
		return () => {
			alive = false;
		};
	}, []);

	return (
		<>
			<dl className={css.grid}>
				{stats.map((s) => (
					<div key={s.id} className={css.cell}>
						<dd className={`${css.value} num ${s.value ? "" : css.pending}`}>
							{s.value ?? "—"}
						</dd>
						<dt className={css.label}>{s.label}</dt>
						<p className={css.hint}>{s.hint}</p>
					</div>
				))}
			</dl>
			<p className={css.note}>
				{STATS_NOTE}{" "}
				<a
					className={css.link}
					href={STATS_LINK.href}
					target="_blank"
					rel="noreferrer"
				>
					{STATS_LINK.label}
				</a>
				.
			</p>
		</>
	);
}
