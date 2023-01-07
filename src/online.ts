import { createBall, drawBall } from "./ball";
import { getCanvasContext } from "./canvas";
import { keyCodes } from "./game.config";
import { createPaddleLeft, createPaddleRight, drawPaddle, movePaddleDown } from "./paddle";

const socket = new WebSocket('ws://localhost:5000');

const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const DOWN = 'DOWN';
const UP = 'UP';
const PRESS = "PRESS";
const RELEASE = "RELEASE";

let side: string | null;
let oppSide: string | null;

type ConnInitData = {
    id: string;
    roomId: string;
    side: string;
}

socket.addEventListener('open', () => {
    console.log('connected');
})

socket.addEventListener('message', (event: MessageEvent) => {
    if (typeof event.data === 'string') {
        const str:string = event.data.toString();
        const [key,action] = str.split(':');
        if(key===DOWN && action===PRESS) movePaddleDown(ctx,paddleLeft);
    }
    let data: ConnInitData = event.data;
    side = data.side;
    if (side === LEFT) oppSide = RIGHT;
    else oppSide = LEFT;

})

const actions = {
    'keydown': {
        [keyCodes.arrowDown]: () => socket.send(`DOWN:PRESS`),
        [keyCodes.s]: () => socket.send('DOWN:PRESS'),
        [keyCodes.arrowUp]: () => socket.send('UP:PRESS'),
        [keyCodes.w]: () => socket.send('UP:PRESS'),
    },
    'keyup': {
        [keyCodes.arrowDown]: () => socket.send('DOWN:RELEASE'),
        [keyCodes.s]: () => socket.send('DOWN:RELEASE'),
        [keyCodes.arrowUp]: () => socket.send('UP:RELEASE'),
        [keyCodes.w]: () => socket.send('UP:RELEASE'),
    }
}

window.addEventListener('keydown', (e: KeyboardEvent) => {
    actions['keydown'][e.code]();
})

window.addEventListener('keyup', (e:KeyboardEvent) => {
    actions['keyup'][e.code]();
})

let ctx = getCanvasContext();
let paddleLeft = createPaddleLeft(ctx);
let paddleRight = createPaddleRight(ctx);
let ball = createBall(ctx);

drawPaddle(ctx, paddleLeft);
drawPaddle(ctx, paddleRight);
drawBall(ctx, ball);


export { };