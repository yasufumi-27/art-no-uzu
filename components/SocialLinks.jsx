import { SOCIAL, SOCIAL_ROWS } from "@/lib/social";

export default function SocialLinks({ className = "", centered = false, linkClassName = "", spacious = false, compact = false }) {
  const rows = compact ? [SOCIAL.slice(0, 4), SOCIAL.slice(4)] : SOCIAL_ROWS;
  return (
    <nav aria-label="SNSリンク" className={`${compact ? "space-y-1" : spacious ? "space-y-4 md:space-y-3" : "space-y-3"} ${className}`}>
      {rows.map((row, index) => (
        <ul key={index} className={`flex ${compact ? "gap-x-3" : spacious ? "gap-x-8 md:gap-x-6" : "gap-x-6"} ${centered ? "justify-center" : ""}`}>
          {row.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer"
                className={`transition-colors hover:text-[var(--color-ink)] ${linkClassName}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  );
}
