import { createBall, drawBall, moveBall } from "./ball";
import { getCanvasContext } from "./canvas";
import { keyCodes } from "./game.config";
import { createPaddleLeft, createPaddleRight, drawPaddle, movePaddleDown, movePaddleUp, Paddle, stopPaddle } from "./paddle";

let ctx = getCanvasContext();
let paddleLeft = createPaddleLeft(ctx);
let paddleRight = createPaddleRight(ctx);

let ball = createBall(ctx);

drawPaddle(ctx, paddleLeft);
drawPaddle(ctx, paddleRight);
drawBall(ctx, ball);

const socket = new WebSocket('ws://localhost:5000');

const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const DOWN = 'DOWN';
const UP = 'UP';
const PRESS = "PRESS";
const RELEASE = "RELEASE";

// send to bigquery
// then create a dashboard
// impressions, clicks, purchases, sales, cost
// clicks / impressions -> ctr
// conversion ratio
// advertismenent cost of sales - acost
// marketing stream api docs
// red + green

let side: string | null;
let oppSide: string | null;
let thisPaddle: Paddle;
let oppPaddle: Paddle;

type ConnInitData = {
    id: string;
    roomId: string;
    side: string;
}

socket.addEventListener('open', () => {
    console.log('connected');
})


const sendMessage = {
    'keydown': {
        [keyCodes.arrowDown]: () => {
            socket.send(`DOWN:PRESS`)
            movePaddleDown(ctx,thisPaddle);
        },
        [keyCodes.s]: () => {
            socket.send('DOWN:PRESS')
            movePaddleDown(ctx,thisPaddle);
        },
        [keyCodes.arrowUp]: () => {
            socket.send('UP:PRESS');
            movePaddleUp(ctx,thisPaddle);
        },
        [keyCodes.w]: () => {
            socket.send('UP:PRESS');
            movePaddleUp(ctx,thisPaddle);
        },
    },
    'keyup': {
        [keyCodes.arrowDown]: () => {
            socket.send('DOWN:RELEASE');
            stopPaddle(thisPaddle);
        },
        [keyCodes.s]: () => {
            socket.send('DOWN:RELEASE')
            stopPaddle(thisPaddle);
        },
        [keyCodes.arrowUp]: () => {
            socket.send('UP:RELEASE')
            stopPaddle(thisPaddle);
        },
        [keyCodes.w]: () => {
            socket.send('UP:RELEASE')
            stopPaddle(thisPaddle);
        },
    }
}

console.log(sendMessage);


socket.addEventListener('message', (event: MessageEvent) => {
    const jsonData = JSON.parse(event.data);
    console.log(jsonData);
    if (jsonData.type === "action") {
        const str: string = jsonData.data.toString();
        const [key, action] = str.split(':');
        if(action === RELEASE) stopPaddle(oppPaddle);
        else if(action === PRESS) {
            if(key === UP) movePaddleUp(ctx,oppPaddle);
            if(key === DOWN) movePaddleDown(ctx,oppPaddle);
        }
    }

    if(jsonData.type === 'message'){
        moveBall(ctx,ball, paddleLeft, paddleRight);
    }
    
    if(jsonData.type === "init") {
        let data: ConnInitData = JSON.parse(event.data).data;
        side = data.side;
        console.log(side)
        if (side === LEFT) {
            console.log('left player')
            oppSide = RIGHT;
            thisPaddle = paddleLeft;
            oppPaddle = paddleRight;
        }
        else {
            console.log('right player')
            oppSide = LEFT;
            oppPaddle = paddleLeft;
            thisPaddle = paddleRight;
        }
    }

})


window.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.code);
    sendMessage['keydown'][`${e.code}`]();
})

window.addEventListener('keyup', (e: KeyboardEvent) => {
    console.log(e.code);
    sendMessage['keyup'][`${e.code}`]();
})




export { };