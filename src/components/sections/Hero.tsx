import { APP_URL } from "@/lib/config";
import { TRANCHES } from "@/content/tranches";
import { Button } from "../ui/Button";
import css from "./Hero.module.css";

export function Hero() {
	return (
		<section id="top" className={css.hero}>
			<div className={css.wrap}>
				<p className={css.kicker}>Liquid staking on TON</p>
				<h1 className={css.title}>Choose where you stand in the loss queue.</h1>
				<p className={css.sub}>
					Everywhere else a loss is split evenly — the cautious saver and the
					yield chaser lose the same 10%. Resu changes exactly one thing, and it
					changes everything.
				</p>

				<div className={css.cta}>
					<Button href={APP_URL} external size="lg">
						Open app
					</Button>
					<Button href="#how" variant="ghost" size="lg">
						See how it works
					</Button>
				</div>

				<p className={css.note}>
					No token of our own. No points. No promised APY — just ordinary staking
					yield, divided differently.
				</p>

				<ul className={css.queue} aria-label="Loss queue">
					{TRANCHES.map((t) => (
						<li key={t.id} className={css.row}>
							<span className="muted small">{t.place}</span>
							<span className={`${css.bar} ${css[t.id]}`}>{t.name}</span>
							<span className="num small">{t.net}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
