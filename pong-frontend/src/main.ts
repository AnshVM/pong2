import { paddle_default } from "./game.config";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

ctx.fillStyle = 'white';

type Paddle = {
  x:number,
  y:number,
  width:number,
  height:number,
}

// type Ball = {
//   x:number,
//   y:number,
//   radius:number,
// }


const drawRightPaddle = (ctx: CanvasRenderingContext2D,paddle:Paddle) => {
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

const drawLeftPaddle = (ctx: CanvasRenderingContext2D,paddle:Paddle) => {
  ctx.fillRect(ctx.canvas.width - paddle.x - paddle.width, paddle.y, paddle.width, paddle.height)
}

const drawBall = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, 30, 15, 0, Math.PI * 2, true)
  ctx.fill();
}

drawRightPaddle(ctx,paddle_default);
drawLeftPaddle(ctx,paddle_default);
drawBall(ctx);

const keyCodes = {
  arrowUp:'ArrowUp',
  arrowDown:'ArrowDown',
  w:'KeyW',
  s:'KeyS',
}

window.addEventListener('keydown',(event:KeyboardEvent) => {
  if(event.code === keyCodes.arrowUp){
    console.log('UP')
  }
  if(event.code === keyCodes.arrowDown) {
    console.log('DOWN');
  }
  if(event.code === keyCodes.s){
    console.log('S');
  }
  if(event.code === keyCodes.w){
    console.log('W');
  }
})

export { };