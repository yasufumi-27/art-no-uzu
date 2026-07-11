import Spiral from "@/components/Spiral";

// サイト全体の背景に配置する大きな渦。
// 「新しい渦が生まれる」表現（中心から一筆で描かれつつ回転・成長して現れ、消えては再び生まれる）を、
// 非常にゆっくり（160s）付与する。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="uzu-bg-birth h-[150vmax] w-[150vmax]">
        <Spiral
          turns={7}
          strokeWidth={0.3}
          className="h-full w-full"
          pathClassName="uzu-bg-birth-draw"
        />
      </div>
    </div>
  );
}
