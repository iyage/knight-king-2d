import { Game } from "./Game.ts";

export class Collisionblock {
  width: number;
  height: number;
  x: number;
  y: number;
  constructor(game: Game, x: number, y: number) {
    this.width = 16;
    this.height = 16;
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
