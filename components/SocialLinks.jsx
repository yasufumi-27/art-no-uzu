import { SOCIAL_ROWS } from "@/lib/social";

export default function SocialLinks({ className = "", centered = false, linkClassName = "" }) {
  return (
    <nav aria-label="SNSリンク" className={`space-y-3 ${className}`}>
      {SOCIAL_ROWS.map((row, index) => (
        <ul key={index} className={`flex gap-x-6 ${centered ? "justify-center" : ""}`}>
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
