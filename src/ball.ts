import { COLORS } from "./game.config";
import * as collisions from './collisions';
import { Paddle } from "./paddle";
import { ball_default } from "./game.config";

export type Ball = {
  x: number,
  y: number,
  radius: number,
  animId?: number,
  xSpeed: number,
  ySpeed: number,
}

export const createBall = (ctx:CanvasRenderingContext2D): Ball => (
  {
    x: ctx.canvas.width / 2,
    y: ball_default.y,
    radius: ball_default.radius,
    xSpeed: ball_default.xSpeed,
    ySpeed: ball_default.ySpeed,
  }
)


export const clearBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  ctx.fillStyle = COLORS.BG;
  ctx.beginPath();
  //added  to the radius because for some reason js does not fill the whole circle properly and leaves some border 
  ctx.arc(ball.x, ball.y, ball.radius + 1, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = COLORS.PADDLE_AND_BALL;
}


export const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
}

export const moveBall = (ctx: CanvasRenderingContext2D, ball: Ball, paddleLeft: Paddle, paddleRight: Paddle) => {
  if (ball.animId) {
    window.cancelAnimationFrame(ball.animId);
    ball.animId = undefined;
  }
  const moveBallAnim = () => {
    if (collisions.ballCollidesPaddleRight(ball, paddleRight)) {
      ball.xSpeed = -ball.xSpeed;
    }
    if (collisions.ballCollidesPaddleLeft(ball, paddleLeft)) {
      ball.xSpeed = -ball.xSpeed;
    }
    if (collisions.ballCollidesBottom(ctx, ball)) {
      ball.ySpeed = -ball.ySpeed;
    }
    if (collisions.ballCollidesTop(ball)) {
      ball.ySpeed = -ball.ySpeed;
    }
    clearBall(ctx, { ...ball });
    ball.x = ball.x + ball.xSpeed;
    ball.y = ball.y + ball.ySpeed;
    drawBall(ctx, ball);
    ball.animId = window.requestAnimationFrame(moveBallAnim);
  }
  ball.animId = window.requestAnimationFrame(moveBallAnim);
}