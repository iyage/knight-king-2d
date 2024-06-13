import { Background } from "./Background.ts";
import { Collisionblock } from "./CollisionBlock.ts";
import { InputHandler } from "./InputHandler.ts";
import { Player } from "./Player.ts";

export class Game {
  background: Background;
  height: number;
  width: number;
  player: Player;
  inputHandler: InputHandler;
  scaleCanvasY: number;
  scaleCanvasX: number;
  floorBlocks: Collisionblock[];
  platformBlocks: Collisionblock[];
  constructor(
    width: number,
    height: number,
    collisionPoints: { x: number; y: number }[],
    platformPoints: { x: number; y: number }[]
  ) {
    this.background = new Background(this);
    this.height = height;
    this.width = width;
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.floorBlocks = [];
    this.scaleCanvasY = this.height / 4;
    this.scaleCanvasX = this.width / 4;
    this.floorBlocks = collisionPoints.map((point) => {
      return new Collisionblock(this, point.x * 16, point.y * 16);
    });
    this.platformBlocks = platformPoints.map((point) => {
      return new Collisionblock(this, point.x * 16, point.y * 16);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.scale(4, 4);
    ctx.translate(0, -this.background.image.height + this.scaleCanvasY);
    this.background.draw(ctx);
    this.floorBlocks.forEach((block) => {
      block.draw(ctx);
    });
    this.platformBlocks.forEach((block) => {
      block.draw(ctx);
    });
    this.player.draw(ctx);
    ctx.restore();
  }
  update() {
    this.player.update();
  }
}
