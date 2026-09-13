import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Cta } from "@/components/sections/Cta";
import { Flaw } from "@/components/sections/Flaw";
import { Hero } from "@/components/sections/Hero";
import { Insurance } from "@/components/sections/Insurance";
import { Limits } from "@/components/sections/Limits";
import { Roadmap } from "@/components/sections/Roadmap";
import { Stats } from "@/components/sections/Stats";
import { Tranches } from "@/components/sections/Tranches";
import { Reveal } from "@/components/ui/Reveal";

export default function Page() {
	return (
		<>
			<Loader />
			<Header />

			<main>
				<Hero />
				<Reveal>
					<Stats />
				</Reveal>
				<Reveal>
					<Flaw />
				</Reveal>
				<Reveal>
					<Tranches />
				</Reveal>
				<Reveal>
					<Insurance />
				</Reveal>
				<Reveal>
					<Roadmap />
				</Reveal>
				<Reveal>
					<Limits />
				</Reveal>
				<Reveal>
					<Cta />
				</Reveal>
			</main>

			<Footer />
		</>
	);
}
