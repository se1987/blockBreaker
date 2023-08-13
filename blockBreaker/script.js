'use strict'

//　描画スペースを表示
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//　パドル
const paddleHeight = 10;　//　パドル高さ
const paddleWidth = 75;　　//　パドル幅
//　パドルの表示位置（x座標始点）＝　（描画スペース幅　ー　パドル幅）÷２
let paddleX = (canvas.width - paddleWidth) / 2;　
//　パドルの操作
let rightPressed = false;　//　右が押されたかどうか
let leftPressed = false;　//　左が押されたかどうか

//　ボール位置座標軸の設定
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = getRandomInt(1, 3);
let dy = getRandomInt(-3, -1);
//　ボール半径
const ballRadius = 10;
// スコア
let score = 0;
// ライフ
let lives = 3;


//　ブロック
const brickRowCount = getRandomInt(3, 5);
const brickColumnCount = getRandomInt(5, 10);
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickWidth =  (canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) / brickColumnCount;

// ブロック位置情報の初期化
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}

//　パドルの制御
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
}
  
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// 2つの値の間のランダムな整数を得る関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// ボール描画
//　色コードを生成する関数
const makeColor = function(){
  let chars = "0123456789abcdef";
  let randColor = "";
  for (let i =0; i < 6; i++) {
  randColor += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#${randColor}`;
};

let ballColor = "#008544";

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

// ボールとブロックの衝突検出
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 40;
          ballColor = makeColor(); //  ボールがブロックに当たるたびにボールの色をランダムに変えて描画する
          if (score === brickRowCount * brickColumnCount * 40) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

// スコア関数
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ea5404";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

//　ライフ関数
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#008554";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

// パドル描画
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#261f87";
    ctx.fill();
    ctx.closePath();
}

// ブロックの描画
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#ffdc00";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
}

// 描画を実行する関数
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ブロック表示
  drawBricks(); 
  // パドルの動き  
  drawPaddle();
  if (rightPressed) {
      paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
      paddleX = Math.max(paddleX - 7, 0);
  }
  // ボールの動き    
  drawBall();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
  }
  if (y + dy < ballRadius) {
      dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
      if (x + ballRadius >= paddleX && x - ballRadius <= paddleX + paddleWidth) {
        if(dy <= 5) {
          dy = -dy * 1.2;
          dx = dx * (1 + Math.random())
        } else {
          dy = -dy;
        }
      } else {
        lives--;
        if (!lives) {
          // const image = new Image();
          // image.src = "img/GameOver.png";
          // image.addEventListener("load", (e) => {
          //   ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
          // });
          alert("GAME OVER");
          document.location.reload();
          // clearInterval(interval); // クロームがゲームを終了するのに必要
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = getRandomInt(1, 3);
          dy = getRandomInt(-3, -1);
          paddleX = (canvas.width - paddleWidth) / 2;
        }        
      }
  } 
  x += dx;
  y += dy;
  // ブロック衝突検出
  collisionDetection();
  //　得点表示
  drawScore();
  // ライフ表示
  drawLives();
  // ゲームオーバー表示
  if (lives <= 0) {
    const image = new Image();
    image.src = "img/GameOver.png";
    image.addEventListener("load", (e) => {
      ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    });
  }
  // 描画の繰り返し
  requestAnimationFrame(draw);
}
// const interval = setInterval(draw, 10);
draw();
