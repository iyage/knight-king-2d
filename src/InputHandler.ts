import { Game } from "./Game";

export class InputHandler {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      // this.game.player.playerMove(e.key);
      if (!this.game.keys.includes(e.key)) this.game.keys.push(e.key);
    });
    window.addEventListener("keyup", (e) => {
      this.game.keys = this.game.keys.filter((key) => key !== e.key);
      if (e.key === "ArrowLeft") {
        this.game.player.keys.keyLeft = false;
      } else if (e.key === "ArrowRight") {
        this.game.player.keys.keyRight = false;
      }
    });
  }
}
