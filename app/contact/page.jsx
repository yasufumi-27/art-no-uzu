import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SOCIAL } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "お問い合わせフォームおよび各種SNS・外部サービスへのリンク。",
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    title: "Contact — ART NO UZU",
    description: "お問い合わせフォームおよび各種SNS・外部サービスへのリンク。",
  },
};

export default function ContactPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <h1 className="font-display text-3xl font-light tracking-[0.1em]">
              Contact
            </h1>
            <p className="mt-8 text-sm leading-relaxed text-[var(--color-muted)]">
              作品のご購入・ご依頼・その他お問い合わせは、下記フォームまたは各SNSよりお気軽にご連絡ください。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-sm tracking-wider-jp text-[var(--color-muted)]">
              Links
            </h2>
            <ul className="mt-6 space-y-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-wider-jp underline underline-offset-4 hover:opacity-60"
                  >
                    {s.label} →
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
