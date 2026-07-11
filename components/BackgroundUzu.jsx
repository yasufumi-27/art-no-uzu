import Spiral from "@/components/Spiral";

// サイト全体の背景の渦。
// 1本の渦は「0秒目から30秒かけて中心から描き、10秒目から35秒かけて根本から消える」。
// 2層を 30 秒ずらして重ねることで、30秒ごとに新しい渦が中心から描き始める。
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
        <Spiral
          turns={7}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life uzu-life-b"
        />
      </div>
    </div>
  );
}
