# アーキテクチャ概要

このドキュメントは、PomodoroタイマーWebアプリの現状のアーキテクチャを示します。

## 構成
- Flask（Python）: サーバーサイド、ルーティング、テンプレート描画
- HTML/CSS/JavaScript: クライアントサイドUIとタイマー制御

## ディレクトリ構成
- app.py: Flaskアプリ本体
- static/js/timer.js: タイマーのロジック
- static/css/style.css: スタイルシート
- templates/index.html: メイン画面テンプレート
- tests/test_timer.py: タイマーの単体テスト

## レイヤー
- プレゼンテーション層: templates, static
- アプリケーション層: app.py

## 備考
- models, repositories, services ディレクトリは現状存在しません。
- 単純な1ファイル構成です。
