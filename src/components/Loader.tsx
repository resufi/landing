"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TAGLINE } from "@/lib/config";
import css from "./Loader.module.css";

const DELAY = 2;
const STEP = 0.03;
const CHAR_IN = 0.55;
const MARK_SETTLED = 6.72 * 0.667;
const SIGN_DONE = DELAY + (TAGLINE.length - 1) * STEP + CHAR_IN;
const HOLD_MS = Math.ceil(Math.max(MARK_SETTLED, SIGN_DONE) * 1000);
const FADE_MS = 500;

type Props = {
	/**
	 * The mark's markup, read from `public/` at build time.
	 *
	 * It used to be an `<img src>`, and inside an `<img>` the SVG keeps its own
	 * timeline, which the browser attaches to the image it cached under the file
	 * URL rather than to our mount. On a reload the cached document came back
	 * frozen mid-cycle, every petal already drawn, so the first painted frame
	 * was a finished logo; then the timeline reset and the drawing started over.
	 * Inline there is no such cache: the base state is an empty group, and that
	 * is what paints first.
	 */
	markup: string;
};

export function Loader({ markup }: Props) {
	const [state, setState] = useState<"on" | "leaving" | "off">("on");
	const [held, setHeld] = useState(false);
	const markRef = useRef<HTMLDivElement>(null);

	/*
	 * Inline SMIL runs on the document timeline, which started when the page
	 * did — by the time React mounts, the first petals are already in the past
	 * and would snap to their frozen, drawn state. Rewinding the mark's own
	 * timeline to zero is what makes the animation start from the start, every
	 * load, whatever the boot took.
	 *
	 * Before paint, not after: an effect that runs late lets one frame of the
	 * half-drawn mark through, which is the very flash we are removing.
	 */
	useLayoutEffect(() => {
		markRef.current?.querySelector("svg")?.setCurrentTime(0);
	}, []);

	const reduced =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	useEffect(() => {
		const t = window.setTimeout(() => setHeld(true), reduced ? 200 : HOLD_MS);
		return () => window.clearTimeout(t);
	}, [reduced]);

	useEffect(() => {
		if (state !== "on" || !held) return;
		/*
		 * With motion off we leave at once: globals.css kills transitions with
		 * !important, so transitionend never fires, and waiting for it would pin
		 * an invisible screen over the page forever — with the scroll still
		 * locked underneath.
		 */
		setState(reduced ? "off" : "leaving");
	}, [state, held, reduced]);

	// Insurance against a lost transitionend: leave on the clock instead.
	useEffect(() => {
		if (state !== "leaving") return;
		const t = window.setTimeout(() => setState("off"), FADE_MS + 100);
		return () => window.clearTimeout(t);
	}, [state]);

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
			<div
				ref={markRef}
				className={css.mark}
				aria-hidden="true"
				dangerouslySetInnerHTML={{ __html: markup }}
			/>

			<p className={css.sign} aria-label={TAGLINE}>
				{[...TAGLINE].map((ch, i) => (
					<span
						key={i}
						className={css.char}
						style={{ animationDelay: `${DELAY + i * STEP}s` }}
						aria-hidden="true"
					>
						{ch}
					</span>
				))}
			</p>
		</div>
	);
}
