# ART NO UZU — 制作・運用 ToDo（セッション間共有）

> このファイルは複数の作業セッションで進捗を共有するための管理ドキュメントです。
> 作業を進めたら該当項目のチェックを更新し、必要に応じて「メモ／決定事項」に追記してください。
> 相対日付は使わず、日付は `YYYY-MM-DD` 形式で記載します。

最終更新: 2026-07-05

---

## 現在のステータス

- [x] 仕様書・開発環境の整理
- [x] Next.js + Tailwind + GSAP でデモサイト実装
- [x] 静的エクスポート（`output: export`）でのビルド確認
- [x] GitHub リポジトリ作成・push
- [x] GitHub Actions による GitHub Pages 自動デプロイ設定
- [ ] デモサイトの公開確認（Actions 成功 & URL 表示）
- [ ] クライアントレビュー・フィードバック反映

**デモURL:** https://yasufumi-27.github.io/art-no-uzu/
**リポジトリ:** https://github.com/yasufumi-27/art-no-uzu

---

## フェーズ1：デモ（GitHub Pages）— ほぼ完了

- [ ] リポジトリ Settings → Pages のソースを「GitHub Actions」に設定（初回のみ手動）
- [ ] 実機（iOS / Android）での表示崩れチェック
- [ ] ダミー画像を仮の実作品画像に差し替え（レビュー精度向上のため／任意）
- [ ] コンテンツ文言（ステートメント・プロフィール）をクライアント原稿に差し替え

## フェーズ2：デザイン確定

- [ ] Figma でのデザイン設計・確定
- [ ] サムネイル形状（長方形／正方形）の確定 ※仕様 9.1 未確定
- [ ] メインビジュアルの自動／手動切替の最終挙動決定 ※仕様 8
- [ ] フォント選定（和文・欧文）

## フェーズ3：本番構成への移行（microCMS + Vercel）

- [ ] microCMS アカウント作成・サービス設定
- [ ] コンテンツモデル定義（作品名 / 制作年 / サイズ / 素材 / カテゴリ / シリーズ / 外部リンク / 画像 / hasDetail / Coming Soonフラグ）
- [ ] `lib/works.js` のダミーデータを microCMS API 取得に置き換え
- [ ] Vercel プロジェクト作成・GitHub 連携
- [ ] 環境変数設定（microCMS API キー等）を Vercel に登録
- [ ] `NEXT_PUBLIC_BASE_PATH` を空にして Vercel 用ビルド確認（basePath 不要）
- [ ] 画像を WebP 化・最適化パイプライン整備 ※仕様 15

## フェーズ4：ドメイン取得・本番反映

- [ ] ドメイン取得（年間 約1,000〜3,000円）※仕様書「必須費用」
  - [ ] ドメイン名の決定
  - [ ] レジストラで取得（お名前.com / Cloudflare / Google Domains 等）
- [ ] Vercel にカスタムドメイン追加・DNS 設定（A / CNAME）
- [ ] HTTPS（SSL）有効化確認 ※仕様 18（Vercel は自動）
- [ ] 本番デプロイ・動作確認

## フェーズ5：お問い合わせフォーム本番化

- [ ] 送信方式の確定（Formspree / Resend / Vercel API Route 等）
- [ ] `NEXT_PUBLIC_CONTACT_ENDPOINT` 設定 or API 実装
- [ ] reCAPTCHA（v3 想定）導入 ※仕様 12.2 / 18
- [ ] 送信テスト・受信メール確認

## フェーズ6：SEO・公開前チェック

- [ ] 各ページ title / description 最終調整 ※仕様 17
- [ ] OGP 画像作成・設定
- [ ] sitemap.xml / robots.txt 生成
- [ ] 構造化データ（必要に応じて）
- [ ] Lighthouse でパフォーマンス／アクセシビリティ確認 ※仕様 16
- [ ] 対応環境での動作確認（Chrome 149 / Safari 26.5、Win11 / iOS26 / Android16）※仕様 4

## フェーズ7：運用

- [ ] 作品追加フロー（年別・作品ID付与）のドキュメント化 ※仕様 19
- [ ] Coming Soon 解除の更新フラグ運用手順
- [ ] クライアントへの microCMS 管理画面レクチャー
- [ ] microCMS / Vercel の無料枠上限モニタリング（作品100点前後で有料検討）

---

## メモ／決定事項

- デモは静的エクスポート + GitHub Pages（`basePath=/art-no-uzu`）。本番は Vercel のため basePath 不要。
- 未確定仕様：サムネイル形状（9.1）、MVスライド切替方式（8）。
- ダミー作品画像は `lib/placeholder.js` が id から SVG を生成（本番は microCMS の WebP に置換）。

## 未決事項（クライアント確認待ち）

- [ ] ドメイン名
- [ ] 実作品画像・掲載作品の選定
- [ ] プロフィール／ステートメントの正式原稿
- [ ] 各SNS・BASE・公式LINE の正式URL
