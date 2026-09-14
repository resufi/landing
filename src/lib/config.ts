export const APP_URL = "https://resufi.github.io/fe/";
export const GITHUB_URL = "https://github.com/resufi";

export const TAGLINE = "Resu — results first, everything else later.";

export const DESCRIPTION =
	"Liquid staking with a known loss limit, on TON and Solana. Pick a tranche: " +
	"junior absorbs the first loss, senior is protected by arithmetic, not by " +
	"promises.";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: `/${string}`): string {
	return `${BASE_PATH}${path}`;
}
