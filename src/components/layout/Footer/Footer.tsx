import { APP_URL, GITHUB_URL, TAGLINE } from "@/lib/config";
import css from "./Footer.module.css";

const LINKS = [
	{ href: APP_URL, label: "App" },
	{ href: GITHUB_URL, label: "GitHub" },
] as const;

export function Footer() {
	return (
		<footer className={css.footer}>
			<span>{TAGLINE}</span>
			<span>
				{LINKS.map((l) => (
					<a key={l.label} className={css.link} href={l.href} target="_blank" rel="noopener noreferrer">
						{l.label}
					</a>
				))}
			</span>
		</footer>
	);
}
