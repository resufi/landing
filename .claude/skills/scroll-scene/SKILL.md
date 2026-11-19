---
name: scroll-scene
description: How scroll-driven animation is wired in this Next.js static-export landing — the samurai intro (public/scene/scene.js) and section scenes (public/scene/sections.js), their DOM hooks, progress math, mobile/WebKit rules. Use when adding or changing an animated section, touching public/scene/*, MotionRuntime, or motion-hooks.css.
---

# Скролл-сцены в этом лендинге

Стек: Next.js 15 App Router, `output: "export"` (GitHub Pages), CSS Modules, GSAP ticker, Lenis (только на устройствах с мышью).

## Архитектура
- React рендерит только разметку. Вся анимация живёт в обычных скриптах `public/scene/`:
  - `samurai-frames.js` — кадры самурая (`window.SAMURAI_FRAMES`);
  - `scene.js` — интро: облака, скала, самурай, удар, разрез, лого;
  - `sections.js` — секции: бары очереди, вода, каскад чаш, корень роадмапа, кинцуги, финал.
- Подключает их `src/components/motion/MotionRuntime` (`loadInOrder`): качаются параллельно, выполняются по порядку (`async=false`). Пути — через `asset()` из `src/lib/config.ts` (учитывает basePath).
- Скрипты находят элементы по `id` и хук-классам: `rv`, `bar-row`, `bar`, `fill`, `bv`, `stat`, `num`, `kr`, `crack`, `rm`, `char`, `pose`. Состояния: `in`, `on`, `lit`. В CSS-модулях такие классы пишутся через `:global()`, общие стили хуков — `src/styles/motion-hooks.css`.
- Новый хук = id/класс в TSX + код в `sections.js`. Не переименовывать хуки без поиска по `public/scene`.

## Прогресс
- Интро: `prog` от `scrollY / (intro.offsetHeight − stageH − 0.6·stageH)`, где `stageH = stage.clientHeight` (не `innerHeight`). Хвост 0.6·stageH — экран с лого стоит закреплённым, пока сцена доигрывает.
- Фаза разреза (`prog ≥ PH.slash[1]`) вперёд не быстрее 0,9 с; назад без ограничений.
- Секции: `damp(key, target, rate)`; на тач-устройствах `rate×4`. Высота экрана — `VH` из пробника `position:fixed; height:100vh`, не `innerHeight`.
- Всё на `gsap.ticker`; секция вне экрана (`visible()`) не считается.

## Мобильные / WebKit — проверенные грабли
- `resize` на iOS приходит при показе/скрытии панели адреса. Пересобирать сцену только при реальной смене размера `stage` (интро) или ширины (секции).
- `stroke-dasharray` на пути > ~256 точек Safari рисует кусками; `pathLength="1"` ненадёжен. Для прорисовки: `thin()` до ~90 точек, длина из `getTotalLength()`, хелперы `dashSetup`/`draw`. Горизонтальные штрихи (кинцуги, разделители) — `clip-path: inset()` вместо dash.
- `mask-image` с data-URL Safari декодирует с задержкой → сцена пропадает. Разрез сделан через `clip-path: path()` на экране лого поверх сцены.
- Анимируемое: `transform`, `opacity`, `clip-path`. Не анимировать `mask-image`/CSS-переменные в градиентах, `filter: drop-shadow` на движущихся штрихах.
- На `(pointer: coarse)`: меньше разрешение растра скалы, слабее blur тени, без blur следа меча, без полёта лепестков в барах.
- Lenis на тач-устройствах не включать — даёт скачки скролла на iOS.
- Ховеры только под `@media (hover: hover) and (pointer: fine)`.

## Ассеты
- Тяжёлые SVG растрировать заранее. Скала: исходник `assets/cliff-tree.svg` → `node scripts/raster-tree.mjs` → `public/scene/cliff-tree-{2048,4096}.webp`.

## Обязательно
- `prefers-reduced-motion`: сцены показывают финальное состояние без движения.
- Noscript-фолбэк в `src/app/layout.tsx` раскрывает скрытые хуками элементы — обновлять при новых хуках.
- В коде без комментариев (принято в проекте).
- После изменений: `npm run check`, затем скилл `motion-check`. `npm run check` перезаписывает `.next` — dev-сервер после него перезапускать с `rm -rf .next`.
