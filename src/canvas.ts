import { COLORS } from "./game.config";

export const getCanvasContext = (): CanvasRenderingContext2D => {

    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    ctx.fillStyle = COLORS.PADDLE_AND_BALL;

    return ctx;
}
