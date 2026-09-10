import { APP_URL } from "@/lib/config";
import { Button } from "../ui/Button";
import css from "./Cta.module.css";

export function Cta() {
	return (
		<section className={css.cta}>
			<div className={css.wrap}>
				<h2 className={css.title}>
					Staking where you choose what you lose, and in what order.
				</h2>
				<p className={css.body}>
					The mechanics work and are covered by tests. The open question is
					whether anyone wants them. Try the pool and tell us.
				</p>
				<div className={css.actions}>
					<Button href={APP_URL} external size="lg">
						Open app
					</Button>
					<Button href="#roadmap" variant="ghost" size="lg" className={css.ghost}>
						Read the roadmap
					</Button>
				</div>
			</div>
		</section>
	);
}
