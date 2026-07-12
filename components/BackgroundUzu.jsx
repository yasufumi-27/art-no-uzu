import Spiral from "@/components/Spiral";

// サイト全体の背景の渦（単層・周期30s）：
//   前半15秒で中心から先端まで描き切り、後半15秒で中心（根本）から消えていく。
//   描画・消去とも常に中心の1点から始まり、30秒ごとに繰り返す。常に1本のみ。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[150vmax] w-[150vmax]">
        {/* turns=5.2: 元サイズ(growth=0.28)のまま、viewBox(半径100)に収まる巻き数。
            turns=7 だと外周1.8巻き(パス弧長の約87%)が画面外にクリップされ、
            その見えない区間をアニメーションが往復するため、可視領域では
            描画・消去が中心以外の位置から始まって見えてしまう。 */}
        <Spiral
          turns={5.2}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
      </div>
    </div>
  );
}
