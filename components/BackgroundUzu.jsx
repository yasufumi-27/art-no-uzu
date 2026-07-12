import Spiral from "@/components/Spiral";

// サイト全体の背景の渦（単層・周期30s）：
//   前半15秒で中心から先端まで描き切り、後半15秒で中心（根本）から消えていく。
//   描画・消去とも常に中心の1点から始まり、30秒ごとに繰り返す。常に1本のみ。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[150vmax] w-[150vmax]">
        {/* turns=6。growth=0.113 は 6 巻きの最終半径が viewBox(半径100)に
            ちょうど収まる値で、画面全体を満たす外径(=従来のサイズ)を保ちつつ
            外周を画面外にはみ出させない。はみ出すと見えない区間をアニメーションが
            往復し、可視領域で描画・消去が中心以外から始まって見えるため。 */}
        <Spiral
          turns={6}
          growth={0.113}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
      </div>
    </div>
  );
}
