import Spiral from "@/components/Spiral";

// サイト全体の背景の渦。周期45sで生まれ変わり続ける：
//   0秒目から30秒かけて根本(中心)から描き、
//   10秒目から35秒かけて根本から消え、
//   45秒目から再び描く（以降くり返し）。
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
