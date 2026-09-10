/**
 * Единственное место, где живут внешние адреса и настройки раздачи.
 *
 * Ссылка на приложение встречается на странице пять раз. Захардкоженная,
 * она пять раз и переезжала бы при смене домена — а промахнуться легко,
 * потому что одна из них лежит в подвале и на глаза не попадается.
 */

export const APP_URL = "https://resufi.github.io/fe/";
export const GITHUB_URL = "https://github.com/resufi";

/** Девиз. Он же подпись на заставке, он же og:title — строка одна. */
export const TAGLINE = "Resu — results first, everything else later.";

export const DESCRIPTION =
	"Stake GRAM with a known loss limit. Pick a tranche: junior absorbs the " +
	"first loss, senior is protected by arithmetic, not by promises.";

/**
 * Префикс пути для файлов из public.
 *
 * next/image и <Link> подставляют basePath сами, а вот href у <link rel="icon">
 * и src у обычного <img> — нет. Такие ссылки собираем через asset().
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: `/${string}`): string {
	return `${BASE_PATH}${path}`;
}
