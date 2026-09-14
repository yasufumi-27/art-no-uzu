# ART NO UZU — 制作・運用 ToDo（セッション間共有）

> このファイルは複数の作業セッションで進捗を共有するための管理ドキュメントです。
> 作業を進めたら該当項目のチェックを更新し、必要に応じて「メモ／決定事項」に追記してください。
> 相対日付は使わず、日付は `YYYY-MM-DD` 形式で記載します。

最終更新: 2026-09-14

---

## 現在のステータス

- [x] 仕様書・開発環境の整理
- [x] Next.js + Tailwind でデモサイト実装（GSAP は仕様 16「アニメーション軽量化」のため 2026-07-14 に撤去し CSS へ置換）
- [x] 静的エクスポート（`output: export`）でのビルド確認
- [x] GitHub リポジトリ作成・push
- [x] GitHub Actions による GitHub Pages 自動デプロイ設定
- [ ] デモサイトの公開確認（Actions 成功 & URL 表示）
- [x] クライアントレビュー・フィードバック反映（確認シート回答分。2026-09-14）

**デモURL:** https://yasufumi-27.github.io/art-no-uzu/
**リポジトリ:** https://github.com/yasufumi-27/art-no-uzu

---

## フェーズ1：デモ（GitHub Pages）— ほぼ完了

- [ ] リポジトリ Settings → Pages のソースを「GitHub Actions」に設定（初回のみ手動）
- [ ] 実機（iOS / Android）での表示崩れチェック
- [ ] ダミー画像を仮の実作品画像に差し替え（レビュー精度向上のため／任意）
- [x] コンテンツ文言（ステートメント・プロフィール・活動歴）をクライアント原稿に差し替え（2026-09-14）

## フェーズ2：デザイン確定

- [ ] Figma でのデザイン設計・確定
- [ ] サムネイル形状（長方形／正方形）の確定 ※仕様 9.1 未確定
- [ ] メインビジュアルの自動／手動切替の最終挙動決定 ※仕様 8
- [x] フォント選定：Zen Kaku Gothic New に統一、英語は全大文字（2026-09-14）

## フェーズ3：本番構成への移行（microCMS + Vercel）

- [ ] microCMS アカウント作成・サービス設定
- [ ] コンテンツモデル定義（作品名 / 制作年 / サイズ / 素材 / カテゴリ / シリーズ / 外部リンク / 画像 / hasDetail / Coming Soonフラグ）
- [ ] `lib/works.js` のダミーデータを microCMS API 取得に置き換え
- [ ] Vercel プロジェクト作成・GitHub 連携
- [ ] 環境変数設定（microCMS API キー等）を Vercel に登録
- [ ] `NEXT_PUBLIC_BASE_PATH` を空にして Vercel 用ビルド確認（basePath 不要）
- [ ] 画像を WebP 化・最適化パイプライン整備 ※仕様 15

## フェーズ4：ドメイン取得・本番反映

- [ ] ドメイン取得（`yoshimi-kamitani.art`。更新料 年 約6,000円）※仕様書「必須費用」
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
- [x] OGP 画像作成・設定（`app/opengraph-image.jsx` でビルド時に PNG 生成。2026-07-14）
- [x] sitemap.xml / robots.txt 生成（`app/sitemap.js` / `app/robots.js`。2026-07-14）
- [x] 構造化データ（JSON-LD：WebSite + Person を `app/layout.jsx`、VisualArtwork / ExhibitionEvent を作品詳細で出力。2026-07-14）
- [x] E-E-A-T 対応（canonical URL・authors/creator メタ・Person 強化（受賞歴/sameAs全SNS）・プライバシーポリシー `/privacy` 新設。2026-07-14）
- [ ] Lighthouse でパフォーマンス／アクセシビリティ確認 ※仕様 16
- [ ] 対応環境での動作確認（Chrome 149 / Safari 26.5、Win11 / iOS26 / Android16）※仕様 4

## フェーズ7：運用（詳細は [OPERATIONS.md](./OPERATIONS.md)）

- [ ] 毎年9月：翌年度の見積もり発行（ドメイン更新 約6,000円＋ページ更新）
- [ ] ドメイン更新（期限1ヶ月前に確認）
- [ ] 新年度のページ更新（年タブ追加・Coming Soon 送り・活動歴追記）
- [ ] サイト完成後、Search Console 登録をクライアントと一緒に実施

- [ ] 作品追加フロー（年別・作品ID付与）のドキュメント化 ※仕様 19
- [ ] Coming Soon 解除の更新フラグ運用手順
- [ ] microCMS / Vercel の無料枠上限モニタリング（作品100点前後で有料検討）

---

## メモ／決定事項

- デモは静的エクスポート + GitHub Pages（`basePath=/art-no-uzu`）。本番は Vercel のため basePath 不要。
- 未確定仕様：サムネイル形状（9.1）、MVスライド切替方式（8）。
- ダミー作品画像は `lib/placeholder.js` が id から SVG を生成（本番は microCMS の WebP に置換）。

### 2026-09-14 確認シート回答・打ち合わせで反映したもの

- ヘッダー：背景を白100%に、高さを約2/3（PC 112px→75px）、ロゴはメニュー文字 +1pt、追従はそのまま
- 背景の渦：全面表示をやめ、クリック位置に小さな渦が波紋のように広がって消える演出に変更（`components/ClickUzu.jsx`）
- 渦の形：巻き貝状（対数螺旋）→ 均等な間隔の渦（アルキメデス螺旋）に統一（`components/Spiral.jsx`）
- 英語は全大文字、書体は和文フォント（Zen Kaku Gothic New）に統一（Syne 撤去）
- 一覧で Instagram へ遷移する作品に「INSTAGRAM ↗」の目印（`components/InstagramBadge.jsx`）
- About：プロフィール／ステートメント／活動歴をクライアント原稿に差し替え（渦を描き始めたのは **2015年**）
- 著作権表記 `©YOSHIMI KAMITANI`、プライバシーポリシーの運営者 `ART NO UZU Inc. 神谷佳美`・窓口 `art.no.uzu@gmail.com`（住所・電話は掲載不可）
- BASE：プロフィールリンク誘導のみ（商品取り込み・購入ボタンなし）。確認シートでは「作品ページに購入ボタン」だったが、打ち合わせで変更
- Instagram：画像とリンクをセットで共有してもらう（API 認可はしない）。アカウント情報は預からない
- ログイン情報のお渡しは基本なし

### 過去の打ち合わせメモの反映（2026-09-14）

- TOP の WORKS / EXHIBITION コーナー（3×3）：ホバーした作品を「横3列分・その作品を中心に上下へ半段ずつ」拡大表示（PCのみ）。/works/ の一覧は変更なし
- Coming Soon：花のマーク画像のアニメーション＋枠内のランダムな位置に作品画像がロゴ大・透明度60%で次々に現れる（3秒フェードイン→4秒表示→2秒フェードアウト、3秒ごとに次の画像。`components/ComingSoon.jsx`）。公式LINEのリンクは常設
  - **ポップアップ用の画像は後日受領予定** → `public/images/coming-soon/` に置き、`lib/coming-soon.js` に並べる（空のあいだは解像度の高い作品で代用）
- TOP の WORKS / EXHIBITION は解像度の高い作品（細部スコア2以上・62作品）からランダム表示。スコアは `../素材/scripts/sharpness.py` で計測し `lib/work-quality.json` に出力
- 反映しなかったもの：「フォント 固め・丸みなし」→ 確認シート回答（丸文字系で統一）と衝突するため、回答を優先
- 対応済みだったもの：タイトルはロゴか大文字／ゴシック体

### 作品データの流れ（2026-09-14〜）

- 画像：`../素材/受領_20260914/`（原本）→ `../素材/scripts/convert.py` で WebP 化 → `public/images/works/<年>/`
- 一覧：`scripts/gen-works.mjs` が画像から `lib/works.generated.js` を生成（build/dev 前に自動実行）
- リンク先：`lib/work-links.js` に「作品ID → URL」で登録（2026-09-14 スプレッドシートから125件。未登録の 2022_7・2026_16・2026_17 はアカウントトップへ）
- タイトル等・詳細ページ化：`lib/works.js` の `DETAILS`。詳細ページは対象0件のため `app/works/_detail` に退避中（対象が決まったら `[id]` に戻す）

### 保留（クライアント回答待ち・未着手）

- 作品画像の反映：ギガファイル便で受領済み（2024-2026・TOP画像・アーティスト画像／2015-2023）。**ギガファイル便は期限があるので早めにダウンロード**
- 作品情報はスプレッドシートで共有済み → `lib/works.js` へ反映
- 詳細ページの5作品、メインビジュアル、ライトボックス、一覧、年号ジャンプは「保留」回答
- ロゴデータ（ギガファイル便で受領）

## 未決事項（クライアント確認待ち）

- [ ] ドメイン名
- [ ] 実作品画像・掲載作品の選定（現在はプレースホルダー。作品タイトルは実在のものを反映済み）
- [x] プロフィール／ステートメントの最終確認（2026-09-14 原稿受領・反映）
- [ ] 各SNS・BASE・公式LINE・YouTube・TikTok の正式URL（Instagram は反映済み）
- [x] BASE ショップ：リンク誘導のみ（2026-09-14 確定）

## 参考資料

- アーティスト分析: [ARTIST_PROFILE.md](./ARTIST_PROFILE.md)（神谷佳美 / ART NO UZU のWeb調査まとめ）
