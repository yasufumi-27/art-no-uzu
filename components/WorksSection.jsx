"use client";

import { useSearchParams } from "next/navigation";
import WorksGrid from "@/components/WorksGrid";

// URL の ?year=XXXX を読み取り、WorksGrid の初期表示年に反映する（#6）。
// 例: /works/?year=2024 → 2024 年の作品を表示。
export default function WorksSection(props) {
  const params = useSearchParams();
  const y = Number(params.get("year"));
  const initialYear = Number.isFinite(y) && y > 0 ? y : undefined;
  return <WorksGrid {...props} initialYear={initialYear} />;
}
