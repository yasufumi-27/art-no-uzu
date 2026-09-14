"use client";

import { useEffect, useRef, useState } from "react";
import Spiral from "@/components/Spiral";

// About の History。年を横一列のタイムラインに並べ、選んだ年の項目だけを1つの枠に出す。
// 項目が増えても縦に伸びない（枠の高さは最も項目の多い年に合わせて固定）。
// ・年を選ぶと、タイムライン上の渦がその年まで転がって移動し、項目がペンで書き出されるように現れる
// ・← → ボタン／キーボードの左右キー／スマホの左右スワイプでも年を移動できる
// ・全年の項目は常にページ内にある（非表示の年も文字として残るため検索エンジンにも読まれる）
export default function HistoryTimeline({ history }) {
  // 左が古い年 → 右が新しい年。初期表示は最新年
  const years = [...history].sort((a, b) => a.year - b.year);
  const [active, setActive] = useState(years.length - 1);
  const [played, setPlayed] = useState(false);
  const root = useRef(null);
  const touchX = useRef(null);

  // 画面に入ったときに最初の書き出しを再生する
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i) => setActive(Math.max(0, Math.min(years.length - 1, i)));
  const pos = years.length > 1 ? (active / (years.length - 1)) * 100 : 50;

  return (
    <div
      ref={root}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(active - 1);
        if (e.key === "ArrowRight") go(active + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* タイムライン */}
      <div className="relative mt-10 px-2">
        <div className="absolute left-2 right-2 top-[1.15rem] h-px bg-[var(--color-line)]" />
        <div
          className="history-progress absolute left-2 top-[1.15rem] h-px bg-[var(--color-ink)]"
          style={{ width: `calc((100% - 1rem) * ${pos / 100})` }}
        />
        {/* 選択中の年まで転がって移動する渦 */}
        <span
          aria-hidden="true"
          className="history-knob pointer-events-none absolute top-[1.15rem] h-6 w-6 text-[var(--color-ink)]"
          style={{
            left: `calc(0.5rem + (100% - 1rem) * ${pos / 100})`,
            transform: `translate(-50%, -50%) rotate(${active * 150}deg)`,
          }}
        >
          <span className="block h-full w-full rounded-full bg-[var(--color-bg)]">
            <Spiral turns={3} strokeWidth={9} className="h-full w-full" />
          </span>
        </span>
        <ol className="relative flex justify-between" role="tablist" aria-label="年を選ぶ">
          {years.map((y, i) => (
            <li key={y.year} className="flex w-0 flex-col items-center">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`history-${y.year}`}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-2 px-1 pb-1"
              >
                <span
                  className={`mt-[0.95rem] block h-[0.4rem] w-[0.4rem] rounded-full transition-colors duration-500 ${
                    i <= active ? "bg-[var(--color-ink)]" : "bg-[var(--color-line)]"
                  }`}
                />
                <span
                  className={`mt-2 whitespace-nowrap text-[0.625rem] tracking-[0.15em] transition-colors duration-500 md:text-[0.6875rem] ${
                    i === active
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
                  } ${i % 2 === 1 && i !== active ? "max-sm:invisible" : ""}`}
                >
                  {y.year}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* 選んだ年の項目（全年分を重ねて置き、選択中だけ表示。枠の高さは最大の年に合わせて一定） */}
      <div className="mt-10 grid grid-cols-[auto_1fr] items-start gap-x-6 md:gap-x-12">
        <div className="flex flex-col items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="前の年"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] disabled:opacity-20"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === years.length - 1}
            aria-label="次の年"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] disabled:opacity-20"
          >
            →
          </button>
        </div>
        <div className="grid">
          {years.map((y, i) => {
            const rows = [
              ...y.items.map((t) => ({ t })),
              ...(y.exhibitions ?? []).map((t) => ({ t, exhibition: true })),
            ];
            const on = i === active;
            return (
              <section
                key={y.year}
                id={`history-${y.year}`}
                role="tabpanel"
                aria-hidden={!on}
                className={`history-panel [grid-area:1/1] ${on ? "is-on" : ""} ${on && played ? "is-in" : ""}`}
              >
                <h3 className="history-bigyear font-display text-4xl font-light tracking-[0.12em] md:text-6xl">
                  {y.year}
                </h3>
                <ul className="mt-5 space-y-2 text-xs leading-relaxed tracking-wider-jp md:text-sm">
                  {rows.map(({ t, exhibition }, j) => (
                    <li key={j} className="history-item" style={{ "--delay": `${0.25 + j * 0.12}s` }}>
                      <span className="history-ink">
                        {exhibition && (
                          <span className="mr-2 inline-block border border-[var(--color-ink)] px-1.5 text-[0.5625rem] leading-4 tracking-[0.15em] align-[1px]">
                            Exhibition
                          </span>
                        )}
                        {typeof t === "string" ? (
                          t
                        ) : (
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={on ? 0 : -1}
                            className="underline underline-offset-4 hover:opacity-60"
                          >
                            {t.text} ↗
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
