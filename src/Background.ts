import { Game } from "./Game.ts";

export class Background {
  game: Game;
  image: any;
  constructor(game: Game) {
    this.game = game;
    this.image = document.getElementById("background");
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0);
  }
}
