import type { Metadata, Viewport } from "next";
import { asset, DESCRIPTION, TAGLINE } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
	title: "Resu — staking with a chosen risk tier",
	description: DESCRIPTION,
	/* Иконка со своим фоном, а не прозрачный знак: во вкладке фон задаёт тема
	   пользователя, и белые лепестки на прозрачном пропадали на светлой. */
	icons: {
		icon: [
			{ url: asset("/icon-1024.png"), sizes: "1024x1024", type: "image/png" },
		],
		apple: asset("/icon-1024.png"),
	},

	/* Карточка ссылки в мессенджерах. Заголовком идёт девиз, а не то же
	   описание: в превью у марки есть ровно одна строка, чтобы прозвучать,
	   а справку человек и так увидит, открыв страницу. */
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
