import Spiral from "@/components/Spiral";

// サイト全体の背景に配置する大きな渦（#3）。
// 画面サイズを超える大きさで1つ表示し、渦を表現するアニメーション（#4）を付与する：
//   - 全体がゆっくり回転（渦の巻き）
//   - 呼吸するように拡縮（生命感）
//   - 読み込み時に中心から一筆で描かれる（stroke の draw-in）
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="uzu-bg-rotor">
        <Spiral
          turns={7}
          strokeWidth={0.3}
          className="uzu-bg-svg"
          pathClassName="uzu-draw"
        />
      </div>
    </div>
  );
}
