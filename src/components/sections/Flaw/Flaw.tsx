import { Eyebrow, Heading, Section, Split, Table, Text } from "@/components/ui";
import { LOSS_ROWS, QUIET_ROWS, type CompareRow } from "@/content/tranches";

const HEAD = ["Depositor", "Ordinary liquid staking", "Resu"] as const;
const cells = (rows: readonly CompareRow[]) => rows.map((r) => [r.who, r.ordinary, r.resu]);

export function Flaw() {
	return (
		<Section id="flaw">
			<Split sceneId="waterFx">
				<Eyebrow>The flaw nobody names</Eyebrow>
				<Heading>Everywhere else, a loss is split evenly.</Heading>
				<Text variant="lead">
					Lose 10% of the pool and everyone loses 10% — nobody was ever asked. At Resu the
					loss walks up the queue from the bottom and stops as soon as it has been absorbed.
					The same queue decides who gets paid the most in every year it does not happen.
				</Text>
				<Text variant="note">
					Most years: nothing goes wrong. Base staking taken as 4.5% for the example.
				</Text>
				<Table id="calmTbl" head={HEAD} rows={cells(QUIET_ROWS)} />
				<Text strong>
					Junior more than doubles the plain staking rate — not from a new token and not
					from someone else&rsquo;s deposit, but because senior pays for the right to stand
					behind it. That payment is the whole product, and it arrives every single year.
				</Text>
				<Text variant="note">
					The year it goes wrong: a 500-coin loss on a 10,000-coin pool (junior 2,000 ·
					middle 2,000 · senior 6,000).
				</Text>
				<Table id="stormTbl" head={HEAD} rows={cells(LOSS_ROWS)} />
				<Text strong>
					This is the bill for the line above, and junior pays it in full while the other
					two are untouched. The loss is shown on its own — the year also carried
					junior&rsquo;s +10.3%, so the two net out to roughly −15%. Ordinary staking hands
					everyone −5% and never offered the choice.
				</Text>
				<Text>
					Where does the money come from? From one honest place and no other: the ordinary
					4–5% staking yield. You deposit a staking token you already hold — tsTON on TON,
					JitoSOL on Solana. It appreciates on its own, and that growth reaches every
					depositor automatically. No oracle, no keeper, nothing that can fail to credit
					you.
				</Text>
			</Split>
		</Section>
	);
}
