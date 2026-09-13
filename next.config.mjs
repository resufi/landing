// @ts-check
import path from "node:path";

const basePath = process.env.BASE_PATH?.replace(/\/$/, "") ?? "";

/** @type {import("next").NextConfig} */
const config = {
	output: "export",
	basePath,
	trailingSlash: true,
	images: { unoptimized: true },
	env: { NEXT_PUBLIC_BASE_PATH: basePath },
	outputFileTracingRoot: path.join(import.meta.dirname),
	reactStrictMode: true,
};

export default config;
