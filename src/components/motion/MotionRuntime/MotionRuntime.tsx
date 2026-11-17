"use client";

import gsap from "gsap";
import Lenis from "lenis";
import { useEffect } from "react";
import { asset } from "@/lib/config";

declare global {
	interface Window {
		gsap?: typeof gsap;
		__resuLenis?: Lenis;
		__resuMotion?: boolean;
	}
}

const SCRIPTS = ["/scene/samurai-frames.js", "/scene/scene.js", "/scene/sections.js"] as const;

function loadInOrder(srcs: readonly `/${string}`[]): Promise<void[]> {
	return Promise.all(
		srcs.map(
			(src) =>
				new Promise<void>((resolve, reject) => {
					const s = document.createElement("script");
					s.src = asset(src);
					s.async = false;
					s.onload = () => resolve();
					s.onerror = () => reject(new Error(`failed to load ${src}`));
					document.body.appendChild(s);
				}),
		),
	);
}

export function MotionRuntime() {
	useEffect(() => {
		if (window.__resuMotion) return;
		window.__resuMotion = true;
		window.gsap = gsap;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!reduced) {
			const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: true });
			window.__resuLenis = lenis;
			gsap.ticker.add((t) => lenis.raf(t * 1000));
			gsap.ticker.lagSmoothing(0);
		}

		loadInOrder(SCRIPTS).catch((e: unknown) => console.error(e));
	}, []);

	return null;
}
