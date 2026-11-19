---
name: motion-check
description: Visually verify scroll-driven animation on the landing (samurai intro and sections) in a real browser — screenshots at scroll positions, console errors, frame timing, reduced-motion and mobile emulation. Use after any change to public/scene/*, MotionRuntime or motion CSS, before reporting it done.
---

# Проверка моушена в браузере

1. `rm -rf .next && npm run dev` в фоне (порт в логе, обычно 3000). Не запускать `npm run check` при работающем dev-сервере — он ломает `.next` (500/404).
2. Открыть страницу через chrome-devtools (`new_page`). Таймаут навигации — не ошибка, страница обычно загрузилась. После `location.reload()` контекст скрипта теряется — запускать замер отдельным вызовом с ожиданием ~4–5 с.
3. Скроллить через `window.__resuLenis?.scrollTo(y, {immediate:true}) ?? scrollTo(0, y)`.
4. Интро: `max = intro.offsetHeight − 1.6·stage.clientHeight`. Позиции и что ожидать:
   - 0 — скала, самурай, солнце восходит снизу (не из угла);
   - .3 — наезд камеры;
   - .7 — след удара, `#brand` получает `clip-path: path(...)`;
   - .88 — лист с тенью уезжает вверх, лого RESU PROTOCOL;
   - 1 — `#stage` hidden, лого закреплено.
   Резкий свайп: прыжок с .6 на 1.05 → по кадрам должны пройти растворение (~0,25 с) и подъём (~0,6 с).
5. Секции: бары `#bars .fill` (`clip-path` → `inset(0 0% …)`), корень `#rootMask path` (ниже фронта роста `visibility:hidden`), кинцуги `.kr .crack path` и `.brush svg` (`clip-path` раскрывается при `.in`). Скриншот каждой.
6. `list_console_messages` (error, warn) — пусто.
7. Частота кадров: rAF-замер при программном скролле интро и секций с `cpuThrottlingRate: 4`; смотреть средний и p95 кадр, `longtask`.
8. Режимы: ПК 1440×900; телефон `390x844x3,mobile,touch` (Lenis выключен, лепестков нет); `prefersReducedMotion: reduce` (бары и корень сразу целиком).
9. `pkill -f "next dev"`.

Эмуляция не воспроизводит панель адреса iOS, GPU телефона и баги WebKit. Сообщать честно: что проверено скриншотом/замером, что требует iPhone.
