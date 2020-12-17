## SALON TABLET とは

美容室、タブレット専用ウェブサービスです。

サインイン後、ホーム画面に追加して利用します。

以下の機能を有しています。

- 記事の読み込み、投稿、編集、削除。
- インスタグラムアカウントの連携。投稿の読み込み
- メニュー表、WiFiパスワード、Google検索などのアイテムの登録
- 開発者へのフィードバックの投稿
- テーマの変更（作成中）
- adminアカウントでサンプル記事やウェブ記事の編集が可能

## 使用技術

- Typescript
  エラーを減らすために採用。
- React
  サービス本体のシングルページアプリケーションの制作のために採用。
- Nextjs
  ウェブサービスとウェブサイトを連動させて構築するために採用。SSRで初期表示の最適化も。
- Material UI
  UIに一貫性と保守性を持たせるために採用。グローバルでデフォルトpropsを変更することでテーマ変更機能を実装した。
- Storybook
  UIのテスト。テストしやすくするためにカスタムhooksでDB由来の初期propsを分けている。

- MySQL
  初期のインフラ構成はVPSのLINUXにMySQLインスタンスを直接立ち上げていて、情報が多かったので採用。

- Firebase
  サービスの安定稼働のためにクラウドへ移行。サインイン周りの機能をFirebase Authenticationに。
- GCP
  サービスの安定稼働のためにクラウドへ移行。Firebase Authenticationと一緒利用するのでAWSではなくこちらを採用。

## ER図

## インフラ構成図