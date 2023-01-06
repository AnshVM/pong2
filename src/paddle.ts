import { paddle_default } from "./game.config";

export type Paddle = {
  x: number,
  y: number,
  width: number,
  height: number,
  animId?: number,
}

export const clearPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.clearRect(paddle.x, paddle.y - paddle.width / 2 - 2, paddle.width, paddle.height + paddle.width + 2);
}

export const drawPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.beginPath();
  ctx.arc((paddle.x + paddle.width / 2), paddle.y, paddle.width / 2, 0, 2 * Math.PI);
  ctx.arc((paddle.x + paddle.width / 2), paddle.y + paddle.height, paddle.width / 2, 0, -2 * Math.PI)
  ctx.fill();
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


export const stopPaddle = (paddle: Paddle) => {
  if (paddle.animId) {
    window.cancelAnimationFrame(paddle.animId);
    paddle.animId = undefined;
  }
}


export const movePaddleDown = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  stopPaddle(paddle);
  const animation = () => {
    clearPaddle(ctx, paddle);
    paddle.y = paddle.y + paddle_default.speed;
    drawPaddle(ctx, paddle);
    paddle.animId = window.requestAnimationFrame(animation);
  }
  paddle.animId = window.requestAnimationFrame(animation);
}


export const movePaddleUp = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  stopPaddle(paddle);
  const animation = () => {
    clearPaddle(ctx, paddle);
    paddle.y = paddle.y - paddle_default.speed;
    drawPaddle(ctx, paddle);
    paddle.animId = window.requestAnimationFrame(animation);
  }
  paddle.animId = window.requestAnimationFrame(animation);
}
