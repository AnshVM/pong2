import { Ball, clearBall, createBall, drawBall, moveBall } from "./ball";
import { getCanvasContext } from "./canvas";
import { ball_default, keyCodes } from "./game.config";
import * as paddle from './paddle';

let ctx = getCanvasContext();

let paddleLeft: paddle.Paddle = paddle.createPaddleLeft(ctx);
let paddleRight: paddle.Paddle = paddle.createPaddleRight(ctx);


let ball:Ball = createBall(ctx);


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
    console.log(paddleLeft);
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