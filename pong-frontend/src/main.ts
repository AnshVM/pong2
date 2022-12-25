import { ball_default, paddle_default } from "./game.config";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

const PADDLE_BALL_COLOR = '#d2d2d6';
const BG_COLOR = '#01052b';

ctx.fillStyle = PADDLE_BALL_COLOR;

type Paddle = {
  x: number,
  y: number,
  width: number,
  height: number,
  animId?: number,
}

type Ball = {
  x: number,
  y: number,
  radius: number,
  animId?: number,
}



let paddleLeft: Paddle = {
  x: paddle_default.x,
  y: paddle_default.y,
  height: paddle_default.height,
  width: paddle_default.width,
}

let paddleRight: Paddle = {
  x: ctx.canvas.width - paddle_default.x - paddle_default.width,
  y: paddle_default.y,
  width: paddle_default.width,
  height: paddle_default.height,
}

let ball: Ball = {
  x: ctx.canvas.width / 2,
  y: ball_default.y,
  radius: ball_default.radius,
}

const clearPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.clearRect(paddle.x, paddle.y - paddle.width / 2 - 2, paddle.width, paddle.height + paddle.width + 2);
}

const drawPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.beginPath();
  ctx.arc((paddle.x + paddle.width / 2), paddle.y, paddle.width / 2, 0, 2 * Math.PI);
  ctx.arc((paddle.x + paddle.width / 2), paddle.y + paddle.height, paddle.width / 2, 0, -2 * Math.PI)
  ctx.fill();
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}



const keyCodes = {
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  w: 'KeyW',
  s: 'KeyS',
}

const stopPaddle = (paddle: Paddle) => {
  if (paddle.animId) {
    window.cancelAnimationFrame(paddle.animId);
    paddle.animId = undefined;
  }
}


const movePaddleDown = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  stopPaddle(paddle);
  const animation = () => {
    clearPaddle(ctx, paddle);
    paddle.y = paddle.y + paddle_default.speed;
    drawPaddle(ctx, paddle);
    paddle.animId = window.requestAnimationFrame(animation);
  }
  paddle.animId = window.requestAnimationFrame(animation);
}


const movePaddleUp = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  stopPaddle(paddle);
  const animation = () => {
    clearPaddle(ctx, paddle);
    paddle.y = paddle.y - paddle_default.speed;
    drawPaddle(ctx, paddle);
    paddle.animId = window.requestAnimationFrame(animation);
  }
  paddle.animId = window.requestAnimationFrame(animation);
}


const clearBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  // ctx.clearRect(ball.x-ball.radius,ball.y-ball.radius,ball.radius * 2, ball.radius * 2);
  ctx.fillStyle = BG_COLOR;
  ctx.beginPath();
  //added  to the radius because for some reason js does not fill the whole circle properly and leaves some border 
  ctx.arc(ball.x, ball.y, ball.radius + 1, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = PADDLE_BALL_COLOR;
}


const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
}

const moveBall = (ctx: CanvasRenderingContext2D, ball: Ball, dx: number, dy: number) => {
  if (ball.animId) {
    window.cancelAnimationFrame(ball.animId);
    ball.animId = undefined;
  }
  const moveBallAnim = () => {
    clearBall(ctx, { ...ball });
    ball.x = ball.x + dx;
    ball.y = ball.y + dy;
    drawBall(ctx, ball);
    ball.animId = window.requestAnimationFrame(moveBallAnim);
  }
  ball.animId = window.requestAnimationFrame(moveBallAnim);
}

drawPaddle(ctx, paddleLeft);
drawPaddle(ctx, paddleRight);
drawBall(ctx, ball);
moveBall(ctx, ball, 3, 3)

const prettyClose = (a: number, b: number, d: number) => a - b <= d && a - b >= -d

const ballCollidesPaddleRight = (ball: Ball, paddleRight: Paddle) => {
  // if(prettyClose(ball.x + ball.radius, paddleRight.x,3)){
  console.log('1:', ball.x + ball.radius);
  console.log('2:', paddleRight.x);
  // }
  return (ball.x + ball.radius === paddleRight.x) &&
    ((paddleRight.y <= ball.y) && ((paddleRight.y + paddleRight.height) >= ball.y))
}

const ballCollidesPaddleLeft = (ball: Ball, paddleLeft: Paddle) => (
  (paddleLeft.x + ball.radius === ball.x) &&
  (paddleRight.y <= ball.y && paddleRight.y + paddleRight.height >= ball.y)
)

let id = setInterval(() => {
  const res = ballCollidesPaddleRight(ball, paddleRight);
  console.log(res);
  if (res) {
    console.log('collided with paddle right');
  }
}, 1)

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === keyCodes.arrowUp) {
    movePaddleUp(ctx, paddleRight);
  }
  if (event.code === keyCodes.arrowDown) {
    movePaddleDown(ctx, paddleRight);
  }
  if (event.code === keyCodes.s) {
    movePaddleDown(ctx, paddleLeft);
  }
  if (event.code === keyCodes.w) {
    movePaddleUp(ctx, paddleLeft);
  }
})


window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.code === keyCodes.arrowUp || event.code === keyCodes.arrowDown) {
    stopPaddle(paddleRight);
  }
  if (event.code === keyCodes.s || event.code === keyCodes.w) {
    stopPaddle(paddleLeft);
  }
})

window.addEventListener('keypress', (e: KeyboardEvent) => {
  if (e.code === 'KeyP') {
    clearInterval(id);
    if (ball.animId) window.cancelAnimationFrame(ball.animId);
    clearBall(ctx, ball);
  }
  if (e.code === 'KeyR') {
    clearInterval(id);

    id = setInterval(() => {
      const res = ballCollidesPaddleRight(ball, paddleRight);
      console.log(res);
      if (res) {
        console.log('collided with paddle right');
      }
    }, 1)
    clearBall(ctx, ball);
    ball.x = ctx.canvas.width / 2;
    ball.y = ball_default.y;
    drawBall(ctx, ball);
    moveBall(ctx, ball, 3, 3);
  }
})


export { };