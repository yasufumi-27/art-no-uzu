import Spiral from "@/components/Spiral";

// サイト全体の背景の渦（単層・周期30s）：
//   0秒目から30秒かけて中心から描き、10秒目から20秒かけて根本から消え、
//   30秒目から再び描く（以降くり返し）。常に1本のみで重なりなし。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[150vmax] w-[150vmax]">
        <Spiral
          turns={7}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
      </div>
    </div>
  );
}
