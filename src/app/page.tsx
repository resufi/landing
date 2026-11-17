import { Intro } from "@/components/intro/Intro";
import { Footer } from "@/components/layout/Footer";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { Final, Flaw, Glance, Limits, Queue, Roadmap, Seats } from "@/components/sections";
import { Brush, BrushGradient } from "@/components/ui";
import css from "./page.module.css";

export default function Page() {
	return (
		<>
			<Intro />

			<main id="content" className={css.content}>
				<BrushGradient />
				<Queue />
				<Brush variant={0} />
				<Glance />
				<Brush variant={1} />
				<Flaw />
				<Brush variant={2} />
				<Seats />
				<Roadmap />
				<Brush variant={3} />
				<Limits />
				<Final />
				<Footer />
			</main>

			<MotionRuntime />
		</>
	);
}
