import Spiral from "@/components/Spiral";

// サイト全体の背景の渦（単層・周期30s）：
//   前半15秒で中心から先端まで描き切り、後半15秒で中心（根本）から消えていく。
//   描画・消去とも常に中心の1点から始まり、30秒ごとに繰り返す。常に1本のみ。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[150vmax] w-[150vmax]">
        {/* turns=6・growth=0.28（従来サイズの緩い巻き）。外周(約0.8巻き)は
            画面外にはみ出すが、消去は全体フェードなので方向的な破綻は起きない。
            描画の時間配分は globals.css の uzuLife キーフレームで「角度均等」に
            している（この螺旋の弧長分布に合わせた値。turns/growth を変える場合は
            キーフレームの dash 値も再計算が必要）。 */}
        <Spiral
          turns={6}
          growth={0.28}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
      </div>
    </div>
  );
}
