import { logoGroup, PETAL_CLIPS } from "@/content/logo";
import { cx } from "@/lib/cx";
import css from "./Intro.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const BRAND_SVG =
	`<defs>${PETAL_CLIPS}${logoGroup("petalArt")}</defs>` +
	logoGroup("brandArt", "brandLav");

function Chars({ text }: { text: string }) {
	return (
		<>
			{[...text].map((c, i) => (
				<span key={i} className={cx(css.char, "char")}>
					{c === " " ? " " : c}
				</span>
			))}
		</>
	);
}

export function Intro() {
	return (
		<div id="intro" className={css.intro} data-base={BASE}>
			<p className="sr-only">
				A cliff above the clouds with a crooked pine and a samurai. As you
				scroll he rises and strikes; the cut opens onto the Resu Protocol logo.
			</p>

			<div id="stage" className={css.stage} aria-hidden="true">
				<div id="layerFar" className={css.layer}>
					<div className={css.drift} id="cFar" />
				</div>
				<div id="sunWrap" className={css.sun}>
					<svg id="sunSvg" className={css.svg} preserveAspectRatio="none">
						<circle id="sun" r="40.5" fill="#c62824" />
					</svg>
				</div>
				<div id="layerScene" className={css.layer}>
					<svg id="sceneSvg" className={css.svg} preserveAspectRatio="none">
						<g id="cliffTree" />
						<g id="samurai" />
					</svg>
				</div>
				<div id="layerMid" className={css.layer}>
					<div className={css.drift} id="cMid" />
				</div>
				<div id="layerFront" className={css.layer}>
					<div className={css.drift} id="cFront" />
				</div>
			</div>

			<div id="brand" className={css.brand}>
				<div id="brandLogo" className={css.logo}>
					<svg
						viewBox="0 0 200 195"
						aria-label="Resu Protocol"
						dangerouslySetInnerHTML={{ __html: BRAND_SVG }}
					/>
				</div>
				<div>
					<h1 className={css.title}>
						<span className={css.mask}>
							<Chars text="Resu " />
							<span className={css.accent}>
								<Chars text="Protocol" />
							</span>
						</span>
					</h1>
					<span className={css.rule} id="brandRule" />
				</div>
			</div>

			<div id="scrollBadge" className={css.scroll} aria-hidden="true">
				<div className={css.badge}>
					scroll
					<span className={css.line} />
				</div>
			</div>

			<svg
				id="cutShadow"
				className={cx(css.cut, css.cutShadow)}
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<defs>
					<filter id="shS" x="-30%" y="-30%" width="160%" height="160%">
						<feGaussianBlur stdDeviation="11" />
					</filter>
					<filter id="shH" x="-30%" y="-30%" width="160%" height="160%">
						<feGaussianBlur stdDeviation="2.2" />
					</filter>
				</defs>
				<clipPath id="shBox">
					<rect id="shRect" x="0" y="-5000" width="100" height="5000" />
				</clipPath>
				<g filter="url(#shS)">
					<path id="shSoft" fill="#2b2217" fillOpacity=".42" clipPath="url(#shBox)" />
				</g>
				<g filter="url(#shH)" transform="translate(-1.5 -4)">
					<path id="shHard" fill="#2b2217" fillOpacity=".38" clipPath="url(#shBox)" />
				</g>
			</svg>

			<svg
				id="cutEdge"
				className={cx(css.cut, css.cutEdge)}
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<path id="edgeFib" fill="none" stroke="#1c1a17" strokeOpacity=".28" strokeWidth=".6" strokeLinecap="round" />
				<path id="edgeInk" fill="none" stroke="#1c1a17" strokeOpacity=".42" strokeWidth=".9" strokeLinejoin="round" />
				<path id="edgeLight" fill="none" stroke="#fffdf8" strokeOpacity=".9" strokeWidth="1.4" strokeLinejoin="round" />
			</svg>

			<svg id="slash" className={css.slash} preserveAspectRatio="none" aria-hidden="true">
				<defs>
					<filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="4" />
					</filter>
				</defs>
				<path id="trailGlow" fill="none" stroke="#1c1a17" strokeWidth="4" strokeOpacity=".28" strokeLinejoin="round" filter="url(#neon)" />
				<path id="trailBody" fill="var(--bg)" stroke="#1c1a17" strokeWidth="1.2" strokeLinejoin="round" />
				<path id="trailStreaks" fill="var(--bg)" stroke="#3a3631" strokeWidth=".8" strokeOpacity=".75" strokeLinejoin="round" />
			</svg>
		</div>
	);
}
