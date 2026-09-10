// @ts-check
import path from "node:path";

/**
 * Конфиг намеренно .mjs, а не .ts.
 *
 * TypeScript-конфиг Next перед чтением транспилирует, и этот шаг пишет в
 * .next в обход distDir. При живом `next dev` он затирает чанки разработки,
 * и сервер начинает отдавать 500 с «Cannot find module './833.js'».
 * Проверка типов конфига здесь обеспечивается @ts-check и JSDoc.
 */

/**
 * basePath — префикс пути, по которому раздаётся сайт.
 *
 * На GitHub Pages это `/<репозиторий>/`, а не корень домена. Без него все
 * ссылки на скрипты, стили и картинки ведут в корень, и страница открывается
 * пустой. Значение подставляет сборка (см. .github/workflows/pages.yml),
 * чтобы имя репозитория не было зашито в код — ровно как в приложении.
 */
const basePath = process.env.BASE_PATH?.replace(/\/$/, "") ?? "";

/** @type {import("next").NextConfig} */
const config = {
	/* Лендинг — это текст и картинки. Сервер ему не нужен ни для чего, а
	   статика раздаётся с CDN и не может упасть. */
	output: "export",

	basePath,
	/* Явный trailing slash: Pages отдаёт /path/ как каталог с index.html,
	   и без него внутренние ссылки ловят лишний редирект. */
	trailingSlash: true,

	/* Оптимизатор картинок — серверная штука, в static export её нет.
	   Все изображения здесь SVG, оптимизировать в них нечего. */
	images: { unoptimized: true },

	/* Значение нужно и в рантайме — для ссылок на файлы из public. */
	env: { NEXT_PUBLIC_BASE_PATH: basePath },

	/* Корень проекта задан явно. Next выводит его по ближайшему lockfile, а в
	   домашнем каталоге разработчика лежит посторонний package-lock.json — и
	   корнем становится он, со всеми вытекающими путями. */
	outputFileTracingRoot: path.join(import.meta.dirname),

	reactStrictMode: true,
};

export default config;
