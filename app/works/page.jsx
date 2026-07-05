import WorksGrid from "@/components/WorksGrid";
import Reveal from "@/components/Reveal";
import { works, years, comingSoonYear } from "@/lib/works";

export const metadata = {
  title: "Works / Exhibition",
  description:
    "作品と展示記録の統合アーカイブ。年別に Works / Exhibition を一覧できます。",
};

export default function WorksPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <Reveal className="mb-20 max-w-xl">
        <h1 className="text-3xl font-light tracking-wider-jp">Works / Exhibition</h1>
        <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
作品と展示を同一の時間軸で辿るアーカイブ。西暦を選ぶとその年の作品に切り替わります。
        </p>
      </Reveal>

      <WorksGrid works={works} years={years} comingSoonYear={comingSoonYear} />
    </div>
  );
}
