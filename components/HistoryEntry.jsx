// 活動名・補足・関連リンクを同じ順序で、来歴の両表示に使う。
export default function HistoryEntry({ entry, exhibition = false, active = true }) {
  const stacked = entry.linksLayout === "stacked";
  const links = entry.links?.map(link => (
    <a key={link.href + link.label} href={link.href} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}
      className={`history-link ${stacked ? "mt-1 block w-fit" : "ml-2 inline-block"} whitespace-nowrap border-b border-[var(--color-muted)] text-[0.625rem] tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]`}>
      {link.label} ↗
    </a>
  ));
  return <>
    {(exhibition || entry.exhibition) && <span className="mr-2 inline-block border border-[var(--color-ink)] px-1.5 text-[0.5625rem] leading-4 tracking-[0.15em] align-[1px]">EXHIBITION</span>}
    {entry.text}
    {entry.detail && <span className="block whitespace-pre-line">{entry.detail}{entry.linksWithDetail && links}</span>}
    {!entry.linksWithDetail && (stacked ? <span className="mt-2 block">{links}</span> : links)}
  </>;
}
