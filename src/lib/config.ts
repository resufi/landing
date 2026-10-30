export const APP_URL = "https://resufi.github.io/fe/";
export const GITHUB_URL = "https://github.com/resufi";

export const TAGLINE = "Resu — choose your risk on any asset";

export const DESCRIPTION =
	"Risk-graded yield, built for tokenized real-world assets — and ETH, " +
	"staking tokens and more. Deposit once and choose a tier: protected and " +
	"steady, or aggressive and high-upside. Live on 7 chains.";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: `/${string}`): string {
	return `${BASE_PATH}${path}`;
}
