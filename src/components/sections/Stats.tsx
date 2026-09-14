import { statsFrom } from "@/content/stats";
import { fetchStats } from "@/lib/onchain";
import { Section } from "../ui/Section";
import { StatsGrid } from "./StatsGrid";

export async function Stats() {
	const data = await fetchStats(process.env.TONCENTER_API_KEY);

	return (
		<Section kicker="Protocol at a glance" tone="dark">
			<StatsGrid initial={statsFrom(data)} />
		</Section>
	);
}
