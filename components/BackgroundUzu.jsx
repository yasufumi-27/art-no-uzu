import Spiral from "@/components/Spiral";

// サイト全体の背景の渦。
// 1本の渦は「根本(中心)から描き始め、20秒で6回巻いて先端まで描く。描き始めの15秒後に
// 根本から消え始め、消え始めの10秒後に次の渦が描き始める」を常時繰り返す。
// 2層を 25 秒ずらして重ねることで、この周期を継続的に表現する。
export default function BackgroundUzu() {
  return (
    <div className="uzu-bg" aria-hidden="true">
      <div className="relative h-[112vmax] w-[112vmax]">
        <Spiral
          turns={6}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life"
        />
        <Spiral
          turns={6}
          strokeWidth={0.3}
          pathLength={1000}
          className="absolute inset-0 h-full w-full"
          pathClassName="uzu-life uzu-life-b"
        />
      </div>
    </div>
  );
}
