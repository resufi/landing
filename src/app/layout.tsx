import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { asset, DESCRIPTION, TAGLINE } from "@/lib/config";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/motion-hooks.css";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Resu — choose your risk on any asset",
	description: DESCRIPTION,
	icons: {
		icon: [
			{ url: asset("/icon-1024.png"), sizes: "1024x1024", type: "image/png" },
		],
		apple: asset("/icon-1024.png"),
	},

	openGraph: {
		title: TAGLINE,
		description: DESCRIPTION,
		type: "website",
	},
	twitter: { card: "summary", title: TAGLINE, description: DESCRIPTION },
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#f2eee6",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={manrope.variable}>
			<body>
				<noscript>
					<style>
						{
							"#intro{display:none}.rv,.rm,.kr *,.stat *{opacity:1!important;transform:none!important}.brush svg,.kr path{clip-path:none!important}#openApp{opacity:1!important}"
						}
					</style>
				</noscript>
				{children}
			</body>
		</html>
	);
}
