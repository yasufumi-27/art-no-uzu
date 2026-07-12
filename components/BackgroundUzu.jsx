import Spiral from "@/components/Spiral";

// サイト全体の背景の渦（単層・周期30s）：
//   前半15秒で中心から先端まで描き切り、後半15秒で中心（根本）から消えていく。
//   描画・消去とも常に中心の1点から始まり、30秒ごとに繰り返す。常に1本のみ。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[150vmax] w-[150vmax]">
        {/* growth=0.034: 7巻きの最終半径が viewBox(半径100)に収まる値。
            デフォルト(0.28)では最終半径が約768となりパスの86%が画面外に
            クリップされ、アニメーション時間の大半が見えない部分に費やされる。 */}
        <Spiral
          turns={7}
          growth={0.034}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
      </div>
    </div>
  );
}
