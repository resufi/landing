import { readFileSync } from "node:fs";
import path from "node:path";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Cta } from "@/components/sections/Cta";
import { Flaw } from "@/components/sections/Flaw";
import { Hero } from "@/components/sections/Hero";
import { Limits } from "@/components/sections/Limits";
import { Roadmap } from "@/components/sections/Roadmap";
import { Stats } from "@/components/sections/Stats";
import { Tranches } from "@/components/sections/Tranches";
import { Reveal } from "@/components/ui/Reveal";

/*
 * The mark is read here, at build time, and handed to the loader as markup:
 * the screen is a client component and cannot touch the filesystem, and the
 * provenance block is 7.9 of the file's 11 KB and means nothing in the DOM.
 */
const MARK = readFileSync(
	path.join(process.cwd(), "public", "resu-logo-loader.svg"),
	"utf8",
).replace(/<metadata>[\s\S]*?<\/metadata>/, "");

export default function Page() {
	return (
		<>
			<Loader markup={MARK} />
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
