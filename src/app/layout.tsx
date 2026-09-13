import type { Metadata, Viewport } from "next";
import { asset, DESCRIPTION, TAGLINE } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
	title: "Resu — staking with a chosen risk tier",
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
	themeColor: "#fbfbfa",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
