"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/content/nav";
import { APP_URL, asset } from "@/lib/config";
import { Button } from "./ui/Button";
import css from "./Header.module.css";

export function Header() {
	const [stuck, setStuck] = useState(false);

	useEffect(() => {
		const onScroll = () => setStuck(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className={`${css.header} ${stuck ? css.stuck : ""}`}>
			<div className={css.inner}>
				<a className={css.brand} href="#top">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={asset("/flower-logo-light.svg")} alt="" width={28} height={28} />
					Resu
				</a>

				<nav className={css.nav}>
					{NAV.map((item) => (
						<a key={item.href} href={item.href}>
							{item.label}
						</a>
					))}
				</nav>

				<Button href={APP_URL} external>
					Open app
				</Button>
			</div>
		</header>
	);
}
