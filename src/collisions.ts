import { Ball } from "./ball"
import * as paddle from './paddle';
import { COLLISION_MARGIN } from "./game.config";

export const ballCollidesBottom = (ctx:CanvasRenderingContext2D,ball:Ball) => {
  return (
    prettyClose(ball.y + ball.radius,ctx.canvas.height,COLLISION_MARGIN)
  )
} 

export const ballCollidesTop = (ball:Ball) => {
  return(
    prettyClose(0 + ball.radius,ball.y,COLLISION_MARGIN)
  )
}


const prettyClose = (a: number, b: number, d: number) => a - b <= d && a - b >= -d

export const ballCollidesPaddleRight = (ball: Ball, paddleRight: paddle.Paddle) => {
  return prettyClose(ball.x + ball.radius,paddleRight.x,COLLISION_MARGIN) &&
    ((paddleRight.y <= ball.y + ball.radius) && ((paddleRight.y + paddleRight.height) >= ball.y - ball.radius))
}

export const ballCollidesPaddleLeft = (ball: Ball, paddleLeft: paddle.Paddle) => (
  prettyClose(paddleLeft.x + paddleLeft.width +  ball.radius, ball.x,COLLISION_MARGIN) &&
  (paddleLeft.y <= ball.y + ball.radius && paddleLeft.y + paddleLeft.height >= ball.y - ball.radius)
)