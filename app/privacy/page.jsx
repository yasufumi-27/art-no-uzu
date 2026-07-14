import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "ART NO UZU（神谷佳美公式サイト）のプライバシーポリシー。お問い合わせフォームで取得する個人情報の取り扱いについて。",
  alternates: { canonical: `${SITE_URL}/privacy/` },
  openGraph: {
    title: "Privacy Policy — ART NO UZU",
    description:
      "ART NO UZU（神谷佳美公式サイト）のプライバシーポリシー。お問い合わせフォームで取得する個人情報の取り扱いについて。",
  },
};

// プライバシーポリシー（E-E-A-T：個人情報を取得するフォームを設置するサイトとしての信頼性表示）。
const SECTIONS = [
  {
    title: "基本方針",
    body: "本サイト（ART NO UZU／運営者：神谷佳美）は、訪問者の個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守して、適切に取り扱います。",
  },
  {
    title: "取得する情報",
    body: "お問い合わせフォームの送信時に、お名前・メールアドレス・お問い合わせ内容を取得します。これら以外の個人情報を本サイトが直接取得することはありません。",
  },
  {
    title: "利用目的",
    body: "取得した個人情報は、お問い合わせへの回答および必要なご連絡のためにのみ利用し、それ以外の目的には利用しません。",
  },
  {
    title: "第三者への提供",
    body: "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。なお、フォーム送信にはフォーム送信サービスを利用する場合があり、送信内容は当該サービスのプライバシーポリシーに従って取り扱われます。",
  },
  {
    title: "アクセス解析・Cookie",
    body: "本サイトは現在、アクセス解析ツールおよび広告配信サービスを利用していません。導入する場合は、本ポリシーを更新してお知らせします。",
  },
  {
    title: "外部リンク",
    body: "本サイトからリンクする外部サイト（Instagram・YouTube・TikTok・LINE・BASE 等）における個人情報の取り扱いについて、本サイトは責任を負いません。各サイトのプライバシーポリシーをご確認ください。",
  },
  {
    title: "改定",
    body: "本ポリシーの内容は、必要に応じて予告なく改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じます。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <Reveal className="max-w-xl">
        <h1 className="font-display text-3xl font-light tracking-[0.08em]">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
          本サイトにおける個人情報の取り扱いについて定めます。
        </p>
      </Reveal>

      <Reveal className="mt-16 max-w-2xl space-y-12">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-sm tracking-wider-jp">{s.title}</h2>
            <p className="mt-3 text-xs leading-loose text-[var(--color-muted)]">
              {s.body}
            </p>
          </section>
        ))}
        <p className="border-t border-[var(--color-line)] pt-8 text-[11px] text-[var(--color-muted)]">
          制定日：2026年7月14日
          <br />
          運営者：神谷佳美（ART NO UZU）
        </p>
      </Reveal>
    </div>
  );
}
