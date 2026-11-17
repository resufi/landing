import type { ReactNode } from "react";
import css from "./Split.module.css";

interface Props {
	sceneId: string;
	children: ReactNode;
}

export function Split({ sceneId, children }: Props) {
	return (
		<div className={css.split}>
			<div>{children}</div>
			<div className={css.sticky}>
				<svg id={sceneId} viewBox="0 0 420 520" aria-hidden="true" />
			</div>
		</div>
	);
}
