# ALTO（アルト）— 美容室サイト / ポートフォリオ作品

架空のヘアサロン「ALTO（アルト）渋谷店」のWEBサイトです。
ポートフォリオ用に、静的サイト（HTML / CSS / JavaScript）のみで制作しています。

参考サイト：[LIPPS（https://lipps.co.jp/）](https://lipps.co.jp/)

## デモの見方

`index.html` をブラウザで開くだけで動作します（ビルド不要）。
CDN を利用しているため、閲覧にはインターネット接続が必要です。

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | トップページ（ヒーロー / 01 Concept / 02 Our Promise / 03 Menu / 04 Style / 05 Stylist / 06 Voice / 07 News / 08 Salon・アクセス / 予約導線） |
| `menu.html` | メニュー・料金一覧、おすすめクーポン |
| `stylist.html` | スタイリスト紹介（詳細）、採用情報 |
| `contact.html` | 予約フォーム（バリデーション付き）、よくあるご質問 |
| `assets/css/style.css` | オリジナルスタイル |
| `assets/js/main.js` | オリジナルスクリプト |

## 参考サイトから取り入れたデザイン要素

LIPPS（メンズビューティーブランド）のブランドサイトを参考に、以下の設計思想を踏襲しています。

- **黒基調 × レッドのワンアクセント**：ベースを `#1d1a1a` / `#000`、アクセントを `#e61517` に限定し、
  区切り線・ラベル・ボタン・ホバーのみを赤で差す構成。
- **Oswald による大きな英字見出し**：セクション名を英語の大型タイポグラフィで見せ、
  日本語は小さくトラッキングを広げて添える二段構成。
- **`01 —` の連番セクションラベル**：赤い短い罫線とセットで、ページ全体の流れを数字で示す。
- **モノトーン写真**：人物・店内写真をグレースケール寄りに調整し、ホバーで彩度を戻す。
- **直線的で余白の大きいレイアウト**：角丸・影を使わず、罫線と余白で構造を作る。
- **日本語組版**：`YakuHanJP` で約物（括弧・句読点）のアキを詰める。

## 使用技術

- HTML5 / CSS3 / JavaScript（バニラJS、フレームワークなし）
- [Bootstrap 5.3](https://getbootstrap.com/)（CDN）— グリッド、ユーティリティ、アコーディオン、フォームバリデーション表示
- [Bootstrap Icons 1.11](https://icons.getbootstrap.com/)（CDN）
- [Swiper 11](https://swiperjs.com/)（CDN）— ヒーロースライダー、お知らせティッカー、お客様の声カルーセル
- [AOS 2.3](https://michalsnik.github.io/aos/)（CDN）— スクロール連動アニメーション
- Google Fonts（Oswald / Open Sans / Noto Sans JP）、YakuHanJP（CDN）
- 画像は [Unsplash](https://unsplash.com/) からダウンロードし、`assets/img/` に同梱（オフラインでも表示可能・外部CDNへの依存なし）

## 実装のポイント

- **BEM 記法**：`block__element--modifier` でクラスを設計。レイアウト用は `l-`、
  JavaScript から参照する要素は `js-` プレフィックスの ID で分離し、
  スタイルと挙動の責務が混ざらないようにしています。
- **CSS 設計**：カラー・フォント・余白を `:root` のカスタムプロパティに集約。
  セクションの明暗は `l-section--light` / `l-section--black` のモディファイアだけで切り替わり、
  内部のカード類は親のモディファイアに応じて配色が変わります。
- **レスポンシブ**：Bootstrap のグリッドに加え、991px 以下では独自実装の
  フルスクリーンドロワー（Escキー・背面スクロールロック・項目のスタガー表示）に切り替わります。
- **アクセシビリティ**：`aria-expanded` / `aria-label` / `aria-current` の付与、
  `prefers-reduced-motion` 指定時のアニメーション無効化、代替テキストの記述、
  暗色フォームでの `color-scheme: dark` 指定。
- **フォールバック**：JavaScript や CDN が読み込めない環境でも、
  `no-js` クラスと AOS 属性の除去処理によりコンテンツが表示されます。
- **ギャラリー絞り込み**：`data-category` 属性による軽量なフィルタ機能（ライブラリ不使用）。

## 注意事項

- 店名・スタッフ名・住所・電話番号・料金・お客様の声はすべて架空の設定です。
- 予約フォームは送信処理を持たないデモです（送信ボタンで完了メッセージのみ表示）。
- `assets/img/` の画像は [Unsplash License](https://unsplash.com/license) の下で取得したフリー素材です（クレジット表記不要・商用利用可）。
