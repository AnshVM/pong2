import { Ball, clearBall, drawBall, moveBall } from "./ball";
import { ball_default, COLORS, paddle_default } from "./game.config";
import * as paddle from './paddle';


const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
ctx.fillStyle = COLORS.PADDLE_AND_BALL;


let paddleLeft: paddle.Paddle = {
  x: paddle_default.x,
  y: paddle_default.y,
  height: paddle_default.height,
  width: paddle_default.width,
}

let paddleRight: paddle.Paddle = {
  x: ctx.canvas.width - paddle_default.x - paddle_default.width,
  y: paddle_default.y,
  width: paddle_default.width,
  height: paddle_default.height,
}

let ball:Ball  = {
  x: ctx.canvas.width / 2,
  y: ball_default.y,
  radius: ball_default.radius,
  xSpeed:ball_default.xSpeed,
  ySpeed:ball_default.ySpeed,
}


const keyCodes = {
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  w: 'KeyW',
  s: 'KeyS',
}

paddle.drawPaddle(ctx, paddleLeft);
paddle.drawPaddle(ctx, paddleRight);
drawBall(ctx, ball);
moveBall(ctx, ball, paddleLeft, paddleRight);



window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === keyCodes.arrowUp) {
    paddle.movePaddleUp(ctx, paddleRight);
  }
  if (event.code === keyCodes.arrowDown) {
    paddle.movePaddleDown(ctx, paddleRight);
  }
  if (event.code === keyCodes.s) {
    paddle.movePaddleDown(ctx, paddleLeft);
  }
  if (event.code === keyCodes.w) {
    paddle.movePaddleUp(ctx, paddleLeft);
  }
})


window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.code === keyCodes.arrowUp || event.code === keyCodes.arrowDown) {
    paddle.stopPaddle(paddleRight);
  }
  if (event.code === keyCodes.s || event.code === keyCodes.w) {
    paddle.stopPaddle(paddleLeft);
  }
})

window.addEventListener('keypress', (e: KeyboardEvent) => {
  if (e.code === 'KeyP') {
    if (ball.animId) window.cancelAnimationFrame(ball.animId);
    clearBall(ctx, ball);
  }
  if (e.code === 'KeyR') {
    clearBall(ctx, ball);
    ball.x = ctx.canvas.width / 2;
    ball.y = ball_default.y;
    drawBall(ctx, ball);
    moveBall(ctx, ball,paddleLeft,paddleRight);
  }
})


export { };