import Spiral from "@/components/Spiral";

// サイト全体の背景の渦。
// 2層の渦が「空 → 根本(中心)から描かれる → 根本から消える → 空」を繰り返す。
// 2層目は半周期ずらして始まるため、片方が消えていくときにもう片方が根本から生まれ、重なりながら続く。
// 初期は空の状態から渦が描かれて始まる。全体はゆっくり回転。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="uzu-bg-rotor2 relative h-[150vmax] w-[150vmax]">
        <Spiral
          turns={7}
          strokeWidth={0.3}
          pathLength={100}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
        <Spiral
          turns={7}
          strokeWidth={0.3}
          pathLength={100}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life uzu-life-b"
        />
      </div>
    </div>
  );
}
