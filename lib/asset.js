// public/ 配下のファイルを basePath 付きの URL にする（GitHub Pages は /art-no-uzu 配下で配信）。
export function asset(path) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
