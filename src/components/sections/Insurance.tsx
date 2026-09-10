import { Section } from "../ui/Section";
import css from "./Prose.module.css";

/** Вторая сторона протокола: продажа покрытия и то, чем оно доказывается. */
export function Insurance() {
	return (
		<Section
			id="insurance"
			kicker="The second side"
			title="A claim proved by mathematics, with no vote and no people."
			lead="Another protocol can buy coverage from the pool and pay a premium each period. The premium goes entirely to junior — the tranche that would fund the payout."
		>
			<p className={css.p}>
				We insure the prices protocols take from the Pyth oracle. Every price
				message is signed by a validator set and numbered. If two{" "}
				<em>different</em> messages carry the <em>same</em> number and both are
				validly signed, the signers lied. There is no honest explanation for two
				truths under one number. The contract checks both signatures itself and
				pays out automatically — there is nobody to argue with.
			</p>
			<p className={css.pMuted}>
				The other side of that honesty: the criterion covers a narrow class of
				failures. An admin key stolen and used to sign one false price would
				formally check out, and is <strong>not</strong> a claim. We chose narrow
				but ironclad coverage over broad but arguable. And the contract refuses
				to sell more coverage than the pool holds — checked when the policy is
				sold, not when the payout is due.
			</p>
		</Section>
	);
}
