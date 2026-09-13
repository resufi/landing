"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import css from "./Reveal.module.css";

export function Reveal({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<"static" | "hidden" | "shown">("static");

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (reduced.matches || !("IntersectionObserver" in window)) return;
		setState("hidden");
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const above = e.boundingClientRect.bottom < 0;
					if (!e.isIntersecting && !above) continue;
					setState("shown");
					io.disconnect();
				}
			},
			{ rootMargin: "0px 0px -12% 0px" },
		);

		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className={state === "static" ? undefined : css[state]}>
			{children}
		</div>
	);
}
