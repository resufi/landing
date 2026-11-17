"use client";

import { useEffect } from "react";
import { statsFrom, type Stat } from "@/content/stats";
import { fetchStats } from "@/lib/onchain";

export function GlanceLive({ initial }: { initial: readonly Stat[] }) {
	useEffect(() => {
		let alive = true;
		void fetchStats(undefined, { depositors: false }).then((live) => {
			if (!alive) return;
			const changed = statsFrom(live).filter((s) => {
				const old = initial.find((o) => o.id === s.id);
				return s.value !== undefined && s.value !== old?.value;
			});
			if (changed.length) {
				(window as Window & { __resuStats?: readonly Stat[] }).__resuStats = changed;
				window.dispatchEvent(new CustomEvent("resu:stats", { detail: changed }));
			}
		});
		return () => {
			alive = false;
		};
	}, [initial]);

	return null;
}
