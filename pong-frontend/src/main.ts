import { paddle_default } from "./game.config";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

ctx.fillStyle = 'white';

type Paddle = {
  x: number,
  y: number,
  width: number,
  height: number,
  animId? : number,
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

// type Ball = {
//   x:number,
//   y:number,
//   radius:number,
// }

const clearPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.clearRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

const drawPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


const drawBall = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, 30, 15, 0, Math.PI * 2, true)
  ctx.fill();
}

drawPaddle(ctx, paddleLeft);
drawPaddle(ctx, paddleRight);
drawBall(ctx);

const keyCodes = {
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  w: 'KeyW',
  s: 'KeyS',
}

const stopPaddle = (paddle:Paddle) => {
  if(paddle.animId){
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
  paddle.animId =  window.requestAnimationFrame(animation);
}


const movePaddleUp = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
  stopPaddle(paddle);
  const animation = () => {
    clearPaddle(ctx, paddle);
    paddle.y = paddle.y - paddle_default.speed;
    drawPaddle(ctx, paddle);
    paddle.animId = window.requestAnimationFrame(animation);
  }
  paddle.animId =  window.requestAnimationFrame(animation);
}

window.addEventListener('keydown', (event: KeyboardEvent) => {
  console.log('keypress')
  if (event.code === keyCodes.arrowUp) {
    movePaddleUp(ctx,paddleRight);
  }
  if (event.code === keyCodes.arrowDown) {
    movePaddleDown(ctx,paddleRight);
  }
  if (event.code === keyCodes.s) {
    movePaddleDown(ctx,paddleLeft);
  }
  if (event.code === keyCodes.w) {
    movePaddleUp(ctx,paddleLeft);
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


export { };