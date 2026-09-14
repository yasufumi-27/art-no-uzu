// 一覧で「Instagram の投稿へ遷移する作品」を見分けるための目印
// （2026-09 クライアント回答：一覧で見分けがつくようにする）。
// Exhibition ラベル（左上）と重ならないよう右上に置く。
export default function InstagramBadge({ small = false }) {
  return (
    <span
      className={`absolute bg-black/70 tracking-wider-jp text-white ${
        small
          ? "right-2 top-2 px-1.5 py-0.5 text-[0.5625rem]"
          : "right-3 top-3 px-2 py-1 text-[0.625rem]"
      }`}
    >
      Instagram ↗
    </span>
  );
}
