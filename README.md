# games
  このリポジトリには、Webブラウザ上で動作する２種類のゲームアプリがあります。
  ゲームの内容は、以下のとおりです。

## blockbreaker
- マウスか左右の矢印キーでパドルを操作し、ブロックを全て壊すゲーム
- ボールを３回落としてしまうとゲームオーバー
- 全てのブロックを壊せばクリア

## typing
- タイピングゲーム
- 表示される言葉や文章を入力　→ enter key　で送信
- ３回間違えるとゲームオーバー
- 100点を目指そう！
  
  
# 目的
  これらのアプリは、プログラミング初学者が、JavaScriptの学習のために作成したものです。

# こだわったポイント
## blockbreaker
  - 表示されるブロックの数は、ロードする度にランダムに表示されるように実装しました。
  - ボールがブロックに当たるたびに、色が変わるように設定し、一定の確率で背景色と同化し、消えたように見せました。
  - ボールがパドルに当たる度に、ボールの速度が速くなり、ゲームの難易度がだんだん上がるようにしました。
