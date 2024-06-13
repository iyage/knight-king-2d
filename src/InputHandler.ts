import { Game } from "./Game";

export class InputHandler {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      this.game.player.playerMove(e.key);
    });
    window.addEventListener("keyup", (e) => {
      this.game.player.playerStop(e.key);
    });
  }
}
