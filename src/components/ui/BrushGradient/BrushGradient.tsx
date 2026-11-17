export function BrushGradient() {
	return (
		<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
			<defs>
				<linearGradient id="brushGrad" x1="0" x2="1">
					<stop offset="0" stopColor="#7c5ce6" stopOpacity="0" />
					<stop offset=".5" stopColor="#7c5ce6" />
					<stop offset="1" stopColor="#7c5ce6" stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
}
