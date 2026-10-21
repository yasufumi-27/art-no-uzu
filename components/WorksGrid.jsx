"use client";

import { useState } from "react";
import Link from "next/link";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import ComingSoon from "@/components/ComingSoon";
import { workAlt } from "@/lib/works";
import { asset } from "@/lib/asset";
import { archiveGroups } from "@/lib/archive-layout";
import styles from "./WorksGrid.module.css";

function cardStyle(index) {
  return { animationDelay: `${(index % 8) * 0.09}s` };
}

function Destination({ work, extra, children, ...props }) {
  if (work?.hasDetail) return <Link href={`/works/${work.id}`} {...props}>{children}</Link>;
  return <a href={work?.instagram || extra.href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

function Card({ card, index }) {
  const { work, extra, image } = card;
  const title = work ? workAlt(work) : extra.title;
  const src = image || work?.thumb || extra?.image;
  return (
    <Destination work={work} extra={extra} className={`work-in group ${styles.card}`} style={cardStyle(index)} aria-label={title}>
      <div className={`zoom-card ${styles.square}`}>
        {src ? <FadeImg src={src} sizes="(min-width: 1760px) 350px, (min-width: 1024px) 22vw, (min-width: 768px) 210px, 38vw" alt={title} className={styles.cardImage} /> : <div className={styles.textCard}><span>{extra.kind}</span><p>{extra.title}</p></div>}
        {work?.category !== "Works" && work && <span className={styles.badge}>{work.category}</span>}
        {work && !work.hasDetail && <InstagramBadge label={work.linkLabel} />}
        {extra && <span className={styles.badge}>{extra.kind} ↗</span>}
        {work?.title && <div className={styles.hoverTitle}><p>{work.title}</p></div>}
      </div>
      {extra && <p className={styles.extraTitle}>{extra.title}</p>}
    </Destination>
  );
}

function Feature({ feature }) {
  const { work, extra, label, image, portrait } = feature;
  return (
    <Destination work={work} extra={extra} className={`work-in group ${styles.feature}`} aria-label={label} data-feature-id={work?.id || extra.kind}>
      <div className={`${styles.featureFrame} ${portrait ? styles.portrait : ""}`} style={feature.aspectRatio ? { aspectRatio: feature.aspectRatio } : undefined}>
        <FadeImg src={portrait ? asset("/images/about/artist.webp") : image} alt={portrait ? `「${label}」を持つ神谷佳美` : label} sizes="(min-width: 1760px) 1140px, (min-width: 1024px) 65vw, (min-width: 768px) 680px, 86vw" className={styles.featureImage} style={feature.objectPosition ? { objectPosition: feature.objectPosition } : undefined} />
      </div>
      <p className={styles.featureTitle}>{label}<span aria-hidden="true">{work?.hasDetail ? " →" : " ↗"}</span></p>
    </Destination>
  );
}

export default function WorksGrid({ works, years, comingSoonYear, initialYear, extras = [] }) {
  const tabs = [comingSoonYear, ...years];
  const valid = tabs.includes(initialYear) ? initialYear : years[0];
  const [activeYear, setActiveYear] = useState(valid);
  const groups = archiveGroups(works.filter(w => w.year === activeYear), extras.filter(e => e.year === activeYear), activeYear);
  return (
    <div className="works-archive">
      <div className="mb-14 grid grid-cols-7 gap-y-3 border-b border-[var(--color-line)] pb-6 text-[13px] tracking-[0.08em] sm:flex sm:flex-wrap sm:gap-x-5 sm:text-sm sm:tracking-[0.22em]">
        {tabs.map(year => <button key={year} onClick={() => setActiveYear(year)} aria-pressed={activeYear === year} className={`nav-link underline-offset-4 transition-colors hover:text-[var(--color-ink)] ${activeYear === year ? "font-medium text-[var(--color-ink)] underline" : "text-[var(--color-muted)]"}`}>{year}</button>)}
      </div>
      <div className={styles.yearHeading}><span aria-hidden="true" /><h2>{activeYear}</h2><span aria-hidden="true" /></div>
      {activeYear === comingSoonYear ? <ComingSoon year={comingSoonYear} /> : (
        <div key={activeYear} className={styles.groups} data-archive-year={activeYear}>
          {groups.map(({ feature, cards }, i) => <section key={feature?.work?.id || feature?.extra?.href || `remaining-${i}`} className={styles.group} data-archive-group={i + 1} aria-label={feature ? `${activeYear} ${feature.label}` : `${activeYear} 作品`}>
            {feature && <Feature feature={feature} />}
            {cards.length > 0 && <div className={styles.smallGrid} data-small-grid>{cards.map((card, j) => <Card key={card.key} card={card} index={j} />)}</div>}
          </section>)}
        </div>
      )}
    </div>
  );
}
