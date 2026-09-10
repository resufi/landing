import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Ceiling } from "@/components/sections/Ceiling";
import { Cta } from "@/components/sections/Cta";
import { Flaw } from "@/components/sections/Flaw";
import { Hero } from "@/components/sections/Hero";
import { Insurance } from "@/components/sections/Insurance";
import { Limits } from "@/components/sections/Limits";
import { Roadmap } from "@/components/sections/Roadmap";
import { Stats } from "@/components/sections/Stats";
import { Tranches } from "@/components/sections/Tranches";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Порядок секций подчинён ходу рассуждения, а не списку преимуществ: сначала
 * изъян, который есть у всех, потом наше единственное изменение, потом его
 * цена, потом планы — и только в конце то, чего мы не обещаем.
 *
 * Последний блок здесь самый сильный. Раздел «чего мы не обещаем» стоит
 * предпоследним ровно потому, что его нет ни у кого: там, где остальные
 * показывают APY, мы показываем границы.
 */
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
					<Ceiling />
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
