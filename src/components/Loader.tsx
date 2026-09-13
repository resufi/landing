"use client";

import { useEffect, useRef, useState } from "react";
import { asset, TAGLINE } from "@/lib/config";
import css from "./Loader.module.css";

const DELAY = 2;
const STEP = 0.03;
const CHAR_IN = 0.55;
const MARK_SETTLED = 6.72 * 0.667;
const SIGN_DONE = DELAY + (TAGLINE.length - 1) * STEP + CHAR_IN;
const HOLD_MS = Math.ceil(Math.max(MARK_SETTLED, SIGN_DONE) * 1000);
const LOAD_TIMEOUT_MS = 3000;

export function Loader() {
	const [state, setState] = useState<"on" | "leaving" | "off">("on");
	const [started, setStarted] = useState(false);
	const markRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (markRef.current?.complete) setStarted(true);
		const fallback = window.setTimeout(
			() => setStarted(true),
			LOAD_TIMEOUT_MS,
		);
		return () => window.clearTimeout(fallback);
	}, []);

	useEffect(() => {
		if (!started) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const leave = window.setTimeout(
			() => setState("leaving"),
			reduced ? 200 : HOLD_MS,
		);
		return () => window.clearTimeout(leave);
	}, [started]);

	useEffect(() => {
		if (state === "off") return;
		const html = document.documentElement;
		const before = html.style.overflow;
		html.style.overflow = "hidden";
		return () => {
			html.style.overflow = before;
		};
	}, [state]);

	useEffect(() => {
		if (state !== "off") return;
		document.documentElement.dataset.ready = "";
	}, [state]);

	if (state === "off") return null;

	return (
		<div
			className={`${css.screen} ${state === "leaving" ? css.leaving : ""}`}
			role="status"
			aria-busy={state === "on"}
			aria-label="Loading"
			onTransitionEnd={() => setState("off")}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={markRef}
				className={css.mark}
				src={asset("/resu-logo-loader.svg")}
				alt=""
				onLoad={() => setStarted(true)}
				onError={() => setStarted(true)}
			/>

			<p className={css.sign} aria-label={TAGLINE}>
				{started
					? [...TAGLINE].map((ch, i) => (
							<span
								key={i}
								className={css.char}
								style={{ animationDelay: `${DELAY + i * STEP}s` }}
								aria-hidden="true"
							>
								{ch}
							</span>
						))
					: null}
			</p>
		</div>
	);
}
