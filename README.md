# 技術ナレッジ共有アプリ

## 1. アプリの概要

アイデアや技術を気軽に書き込んで共有できるアプリ

## 2. 技術スタックと選んだ理由

・json-server は簡単な仮のバックエンド。
・Reactはモダンなweb開発で最もシェアが高い。
・react-router-dom や react-markdown などの便利なライブラリもある。
・Viteを利用することでファイル準備などが要らず、手元でも動作確認などができてReactの開発をすぐに始めることができる。
・ContextAPIを使う事によりログイン情報を無駄なく共有化。
・Tailwind CSSは、p‐5といってもパッとどのくらいか浮かんでこないが慣れたら素早く記述していけそうで無駄のないCSS。

## 3. 工夫した点・難しかった点

Context APIでログイン状態を共有。
Reactによるヘッダーとそれ以外でわけることによる最低限の読み込み。
カスタムフックはとりあえず何とかしただけで、、もう…わけがわからなくなりました。

## 4. デモURLまたはスクリーンショット


## 5. ローカルでの起動手順

起動手順の流れ

ターミナル1（Dockerを起動した画面）でVite（画面側）を動かす。
ターミナル2（docker exec で入った画面）でJSON Server（データ側）を動かす。


1. Docker Desktop を起動する
2. PowerShell でDockerコンテナを起動する（ターミナル1）
   docker run -it --rm -v D:\nodeapp:/app -w /app -p 5173:5173 -p 3000:3000 --entrypoint sh node:26-slim
3. 初回だけ、プロジェクトフォルダで部品をインストールする
   cd /app/myapp/tech-share-app && npm install
4. プロジェクトの直下に .env ファイルを作り、次の1行を書く（API の URL を入れるメモ帳）
   VITE_API_URL=http://127.0.0.1:3000
5. ターミナル1でVite（画面）を起動する
   npm run dev -- --host 0.0.0.0
6. 別のPowerShellを開き、docker ps でコンテナ名を調べて入る（ターミナル2）
   docker exec -it コンテナ名 sh
7. ターミナル2でJSON Server（データ）を起動する
   cd /app/myapp/tech-share-app && npx json-server --watch db.json --host 0.0.0.0 --port 3000
8. ブラウザで http://127.0.0.1:5173/ を開く