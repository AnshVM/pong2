export const paddle_default = {
    color:"#e1e3f5",
    width:3,
    height:70,
    x:15,
    y:30,
    speed:15,
}

export const ball_default = {
    color:'#e1e3f5',
    radius:8,
    y:50, 
    xSpeed:2,
    ySpeed:2
}

export const COLLISION_MARGIN = 5;

export const COLORS = {
    BG:'#01052b',
    PADDLE_AND_BALL :'#d2d2d6',
}

export const keyCodes = {
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  w: 'KeyW',
  s: 'KeyS',
}

export const controls = {
    "RIGHT":{
        "UP":keyCodes.w,
        "DOWN":keyCodes.s,
    },
    "LEFT":{
        "UP":keyCodes.arrowUp,
        "DOWN":keyCodes.arrowDown,
    }
}