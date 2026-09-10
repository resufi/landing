import { APP_URL, GITHUB_URL, TAGLINE } from "@/lib/config";
import css from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={css.footer}>
			<div className={css.inner}>
				<span>{TAGLINE}</span>
				<nav className={css.links}>
					<a href={APP_URL} target="_blank" rel="noopener noreferrer">
						App
					</a>
					<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</nav>
			</div>
		</footer>
	);
}
