"use client";

import { useEffect, useRef, useState } from "react";
import { asset, TAGLINE } from "@/lib/config";
import css from "./Loader.module.css";

/** Когда вступает первая буква: знак к этому моменту уже дорисован. */
const DELAY = 2;
/** Шаг между буквами. Набегает ~1.3 с на всю строку — быстрее чтения. */
const STEP = 0.03;
/** Сколько живёт проявление одной буквы (см. char-in в Loader.module.css). */
const CHAR_IN = 0.55;

/**
 * Когда знак внутри SVG заканчивает движение, в секундах.
 *
 * Число не подобрано на глаз, а взято из resu-logo-loader.svg: цикл там
 * длится 6.72s, а подъём центрального лепестка завершается на отметке 0.667
 * от цикла. Отрисовка контуров и заливок заканчивается раньше, на 2.4s
 * (1.84 + 0.56 — последняя заливка), но уйти между этими двумя моментами
 * значит оборвать знак на полудвижении.
 */
const MARK_SETTLED = 6.72 * 0.667;

/** Когда допечатается последняя буква подписи. */
const SIGN_DONE = DELAY + (TAGLINE.length - 1) * STEP + CHAR_IN;

/** Заставка держится, пока не закончится и знак, и подпись. */
const HOLD_MS = Math.ceil(Math.max(MARK_SETTLED, SIGN_DONE) * 1000);

/**
 * Если знак почему-то не загрузился, ждать его вечно нельзя: страница за
 * заставкой уже готова. Через эту паузу уходим в любом случае.
 */
const LOAD_TIMEOUT_MS = 3000;

/**
 * Заставка. Повторяет Loader из приложения — тот же знак с SMIL-анимацией
 * внутри самого SVG и та же подпись, набирающаяся по букве, — чтобы переход
 * с лендинга в app читался как продолжение, а не как новый экран.
 *
 * Отличие ровно одно: в приложении заставка ждёт данные пула, здесь ждать
 * нечего, и она уходит сама — но только после того, как доиграет.
 *
 * Отсчёт начинается не с монтирования, а с загрузки самого SVG. SMIL внутри
 * файла стартует, когда файл пришёл; таймер, запущенный раньше, съедал начало
 * анимации, и на медленной сети знак обрывался недорисованным. По той же
 * причине подпись печатается только вместе со знаком, а не сама по себе.
 */
export function Loader() {
	const [state, setState] = useState<"on" | "leaving" | "off">("on");
	const [started, setStarted] = useState(false);
	const markRef = useRef<HTMLImageElement>(null);

	/* Кэшированная картинка успевает загрузиться до того, как React повесит
	   обработчик, и onLoad тогда не сработает вовсе — поэтому проверяем
	   complete вручную. */
	useEffect(() => {
		if (markRef.current?.complete) setStarted(true);

		const fallback = window.setTimeout(
			() => setStarted(true),
			LOAD_TIMEOUT_MS,
		);
		return () => window.clearTimeout(fallback);
	}, []);

	useEffect(() => {
		if (!started) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const leave = window.setTimeout(
			() => setState("leaving"),
			reduced ? 200 : HOLD_MS,
		);
		return () => window.clearTimeout(leave);
	}, [started]);

	/* Уход заставки — сигнал для анимаций на самой странице: до этого момента
	   они играли бы за непрозрачным экраном и пропали бы впустую. Атрибут на
	   <html>, а не проброс через контекст: подписчик тут один и чисто
	   визуальный, и без JS он просто не появится — страница при этом остаётся
	   в своём конечном, видимом виде. */
	useEffect(() => {
		if (state !== "off") return;
		document.documentElement.dataset.ready = "";
	}, [state]);

	if (state === "off") return null;

	return (
		<div
			className={`${css.screen} ${state === "leaving" ? css.leaving : ""}`}
			role="status"
			aria-busy={state === "on"}
			aria-label="Loading"
			onTransitionEnd={() => setState("off")}
		>
			{/* eslint-disable-next-line @next/next/no-img-element -- SMIL внутри
			    SVG живёт только в обычном <img>: next/image переписывает его
			    в свою обёртку и анимация перестаёт запускаться. */}
			<img
				ref={markRef}
				className={css.mark}
				src={asset("/resu-logo-loader.svg")}
				alt=""
				onLoad={() => setStarted(true)}
				onError={() => setStarted(true)}
			/>

			{/* Скринридеру строка отдаётся целиком: посимвольная разметка для
			    него была бы набором одиночных букв. */}
			<p className={css.sign} aria-label={TAGLINE}>
				{started
					? [...TAGLINE].map((ch, i) => (
							<span
								// Индекс — законный ключ: строка неизменна, буквы
								// не переставляются и не добавляются.
								key={i}
								className={css.char}
								style={{ animationDelay: `${DELAY + i * STEP}s` }}
								aria-hidden="true"
							>
								{ch}
							</span>
						))
					: null}
			</p>
		</div>
	);
}
