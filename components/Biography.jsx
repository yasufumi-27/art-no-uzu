import HistoryEntry from "@/components/HistoryEntry";
import { HISTORY } from "@/lib/history";

export default function Biography({ className = "" }) {
  return (
      <section className={className} aria-labelledby="biography-heading">
        <div className="flex items-baseline justify-between gap-6 border-b border-[var(--color-line)] pb-4">
          <h2 id="biography-heading" className="text-sm tracking-[0.2em]">来歴</h2>
        </div>
        <div className="divide-y divide-[var(--color-line)]">
          {[...HISTORY].reverse().filter(({ items, exhibitions }) => items.length > 0 || exhibitions?.length > 0).map(({ year, items, exhibitions }) => (
            <section key={year} aria-labelledby={`biography-${year}`} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[100px_1fr] sm:gap-8 sm:py-8">
              <h3 id={`biography-${year}`} className="font-display pt-0.5 text-[13px] tracking-[0.08em] sm:pt-0 sm:text-lg sm:tracking-[0.15em]">{year}</h3>
              <div className="text-xs leading-[1.85] tracking-[0.02em] sm:text-sm sm:leading-loose sm:tracking-normal">
                {items.length > 0 && <ul className="space-y-1">{items.map(item => <li key={item.text}><HistoryEntry entry={item} /></li>)}</ul>}
                {exhibitions?.length > 0 && <div className={items.length ? "mt-3 sm:mt-5" : ""}>
                  <p className="mb-1 text-[10px] tracking-[0.12em] text-[var(--color-muted)] sm:text-xs">EXHIBITION</p>
                  <ul className="space-y-1">{exhibitions.map(item => <li key={item.text}>{item.text}</li>)}</ul>
                </div>}
              </div>
            </section>
          ))}
        </div>
      </section>
  );
}
