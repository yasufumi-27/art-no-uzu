import images from './responsive-images.generated.json';
import { asset } from './asset';

// Keep the original URL as a fallback and preserve intrinsic aspect ratio.
export function responsiveImage(src, sizes = '100vw') {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const key = base && src.startsWith(`${base}/`) ? src.slice(base.length) : src;
  const image = images[key];
  if (!image) return {};
  return {
    width: image.width,
    height: image.height,
    srcSet: image.variants.map(([width, url]) => `${asset(url)} ${width}w`).join(', '),
    sizes: sizes === 'hero' ? `(min-width: 768px) max(100vw, ${90 * image.width / image.height}vh), max(100vw, ${76 * image.width / image.height}vh)` : sizes,
  };
}
