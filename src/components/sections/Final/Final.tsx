import { Button, ButtonRow, Heading, Text } from "@/components/ui";
import { APP_URL } from "@/lib/config";
import { cx } from "@/lib/cx";
import css from "./Final.module.css";

export function Final() {
	return (
		<div className={css.wrap} id="finalWrap">
			<section className={css.stage} id="final">
				<svg className={css.fx} id="finalFx" aria-hidden="true" />
				<svg className={cx(css.fx, css.front)} id="finalFront" aria-hidden="true" />
				<div className={cx(css.inner, "final-in")}>
					<Heading size="final">
						Choose your risk on any asset — and get paid for the risk you take.
					</Heading>
					<Text>
						The mechanics work and are covered by tests. The open question is whether anyone
						wants them. Try the app and tell us.
					</Text>
					<div className={css.cta}>
						<ButtonRow center reveal={false}>
							<Button id="openApp" href={APP_URL} external pinned>
								Open app
							</Button>
						</ButtonRow>
					</div>
				</div>
			</section>
		</div>
	);
}
