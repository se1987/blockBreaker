'use strict'

//　描画スペースを表示
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// スコア
let score = 0;
// ライフ
let lives = 3;
// 問題
let question = "";
const questionArray1 = ["カブトムシ", "クワガタ", "オオスズメバチ", "モンシロチョウ", "バッタ", "トンボ", "カマキリ", "読書", "YOASOBI"];
const questionArray2 = ["スマトラオオヒラタクワガタ", "ヘラクレスオオカブト", "マンディブラリスフタマタクワガタ", "ムネアカハラビロカマキリ", "GCカラーボール", "まりちゃん・いずちゃん・みなくん", "パンパンマンやないか！", "怪盗キッド参上", "怪盗きっと参上", "緑色のひかる"];
const questionArray3 = ["魚の音読み「ギョギョギョ」", "魚の訓読み「ウォウォ」", "忍法！メガネ残し！", "ダンソン！トゥーザテーサザ コンサ！", "食事、睡眠、不労所得〜", "見た目は子ども、頭脳は大人", "その名は、名探偵コナン!", "ほら、ホットケーキ石焼き芋トッポ", "キットカット買ってきて"];
// 問題の配列からランダムに値を取り出して表示する関数
const getElem = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
question = getElem(questionArray1);

function drawQuestion() {
  ctx.font = "36px Arial";
  ctx.fillStyle = "#008db7";
  ctx.fillText(`${question}`, canvas.width/2, canvas.height/2);
  ctx.textAlign = "center";
}
//　送信を押した時に正誤判定する関数
let answer = document.getElementById("answer");
let answerResult = null;
let timer = null;
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // フォームのデフォルトサブミット動作をキャンセル

  const checkAnswer = function(){
    if (question === answer.value){
      score += 10;
      answerResult = true;
      // 問題を新しく取得し、描画する
      if (score > 40 && score < 80){
        question = getElem(questionArray2);
        drawQuestion();
      } else if (score >= 80){
        question = getElem(questionArray3);
        drawQuestion();
      }  else {
        question = getElem(questionArray1);
        drawQuestion();
      }
      // テキスト入力フィールドをクリアする
      answer.value = "";
      //　ゲームクリア
      if (score >= 100) {
        alert("よくできました💮");
        document.location.reload();
        // const image = new Image();
        // image.src = "img/Congratulations.jpg";
        // image.addEventListener("load", (e) => {
        //   ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
        // });
      }
    } else {
      lives--;
      answerResult = false;
      // 問題を新しく取得し、描画する
      if (score > 40){
        question = getElem(questionArray2);
        drawQuestion();
      } else if (score >= 80){
        question = getElem(questionArray3);
        drawQuestion();
      }  else {
        question = getElem(questionArray1);
        drawQuestion();
      }
      // テキスト入力フィールドをクリアする
      answer.value = "";
      // ゲームオーバー表示
      if (lives <= 0) {
        alert("おしい！もう一度やってみよう！");
        document.location.reload();
        // const image = new Image();
        // image.src = "img/GameOver.png";
        // image.addEventListener("load", (e) => {
        //   ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
        // });
      }
    }
  // タイマーをセットして2秒後に answerResult を null にする
  clearTimeout(timer);
  timer = setTimeout(() => {
    answerResult = null;
    draw();
  }, 500);
    //　問題表示
  drawQuestion();
  }
  checkAnswer();
});

// スコア関数
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ea5404";
  ctx.fillText(`Score:${score}`, 40, 20);
}

//　ライフ関数
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#008554";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 40, 20);
}

// 描画を実行する関数
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //　問題表示
  drawQuestion();
  // 正誤判定結果に基づいて描画
  if (answerResult === true) {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#ea5404";
    ctx.fillText(`○`, canvas.width / 2, canvas.height / 2);
    ctx.textAlign = "center";
  } else if (answerResult === false) {
    ctx.font = "100px Arial";
    ctx.fillStyle = "#ea5404";
    ctx.fillText(`×`, canvas.width / 2, canvas.height / 2);
    ctx.textAlign = "center";
  }
  //　得点表示
  drawScore();
  // ライフ表示
  drawLives();
  // 描画の繰り返し
  requestAnimationFrame(draw);
}
// 初期問題の描画
drawQuestion();
// 初回描画の実行
requestAnimationFrame(draw);
