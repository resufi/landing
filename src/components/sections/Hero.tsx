import { APP_URL } from "@/lib/config";
import { TRANCHES } from "@/content/tranches";
import { Button } from "../ui/Button";
import css from "./Hero.module.css";

export function Hero() {
	return (
		<section id="top" className={css.hero}>
			<div className={css.wrap}>
				<p className={css.kicker}>On-chain risk tiers for real-world assets — and ETH, staking tokens and more</p>
				<h1 className={css.title}>Choose your risk on any asset.</h1>
				<p className={css.sub}>
					Everywhere else a gain and a loss are shared evenly — the cautious
					saver and the yield chaser get the same number. Resu lets each pick a
					tier instead: protected and steady, or aggressive and high-upside.
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
					Built first for tokenized real-world assets — and just as at home with
					ETH, staking tokens and yield-bearing stablecoins. Live across seven
					chains, EVM and non-EVM, with an activity-points program toward the
					future $RESU token. The mechanism is arithmetic, and it ports anywhere
					there is an asset to build on.
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
