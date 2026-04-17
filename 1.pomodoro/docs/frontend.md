# フロントエンド構成

このドキュメントは、PomodoroタイマーWebアプリのフロントエンド構成を示します。

## 主なファイル
- static/js/timer.js: タイマーのロジック（開始・リセット・カウントダウン・表示更新）
- static/css/style.css: UIスタイル
- templates/index.html: HTMLテンプレート

## timer.js の主な関数
- updateDisplay(): 残り時間を mm:ss 形式で表示
- tick(): 1秒ごとに残り時間を減らし、0になったらアラート
- startBtn/resetBtn: 開始・リセットボタンのイベントハンドラ

## UI
- シンプルな1画面構成
- 25分カウントダウン、リセット、終了時アラート

## 備考
- 他のJSモジュールや複雑なUIコンポーネントは現状ありません。
