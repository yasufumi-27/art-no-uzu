# ART NO UZU — アーティスト公式Webサイト（デモ）

画家の公式ポートフォリオサイト。作品（Works / Exhibition）の閲覧・展示記録・アーティスト情報・SNS導線を、静けさと余白を重視したミニマルUIで構成したデモ実装です。

- **デモサイト:** https://yasufumi-27.github.io/art-no-uzu/

## 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フレームワーク | Next.js 15（App Router / 静的エクスポート） |
| スタイリング | Tailwind CSS v4 |
| アニメーション | GSAP |
| データ管理（本番） | microCMS（デモは `lib/works.js` のダミーデータ） |
| 公開（デモ） | GitHub Pages（GitHub Actions で自動デプロイ） |
| 公開（本番想定） | Vercel |

> デモは GitHub Pages で配信するため Next.js を `output: "export"` で静的化しています。
> 本番は Vercel + microCMS への移行を想定しています（[TODO.md](./TODO.md) 参照）。

## 実装済み仕様（抜粋）

- グローバルナビ（Works/Exhibition・About・Contact、ロゴ→TOP）
- TOP：フェード切替のメインビジュアルスライド（自動 + 手動）
- Works/Exhibition 統合一覧：年別 3×3 グリッド、ホバーで概要ポップアップ、Exhibition ラベル、Coming Soon（2027）
- 作品詳細（専用5件）：画像ギャラリースライダー + 作品情報
- 専用ページなし作品：ポップアップ + Instagram 誘導
- About：プロフィール / ステートメント / 活動歴
- Contact：必須項目フォーム + 送信完了画面 + 外部リンク（YouTube / Instagram / TikTok / LINE / BASE）
- SEO/OGP メタ情報、画像 Lazy Load、フェードイン、レスポンシブ（PC 1180px / SP 左右24px）

## 開発

```bash
npm install
npm run dev      # http://localhost:3000

# 本番相当の静的ビルド（GitHub Pages 用に basePath 付与）
NEXT_PUBLIC_BASE_PATH=/art-no-uzu npm run build   # 出力: out/
```

## 環境変数

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | 配信サブパス。GitHub Pages は `/art-no-uzu`、独自ドメイン運用時は空 |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | お問い合わせフォーム送信先（Formspree 等）。未設定時はモック送信 |

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が実行され、GitHub Pages に自動デプロイされます。
