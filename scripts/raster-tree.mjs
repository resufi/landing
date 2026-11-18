import sharp from "sharp";
for (const w of [2048, 4096]) {
	const info = await sharp("assets/cliff-tree.svg", { density: 72 * (w / 2048), limitInputPixels: false })
		.resize(w)
		.webp({ quality: 82, alphaQuality: 90, effort: 6 })
		.toFile(`public/scene/cliff-tree-${w}.webp`);
	console.log(w, info.size);
}
