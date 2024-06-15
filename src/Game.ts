import { Background } from "./Background.ts";
import { Collisionblock } from "./CollisionBlock.ts";
import { InputHandler } from "./InputHandler.ts";
import { Player } from "./Player.ts";
import { Sounds } from "./Sounds.ts";

interface CameraBox {
  x: number;
  y: number;
  height: number;
  width: number;
}
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

  keys: string[];
  cameraBox: CameraBox;
  camera: { x: number; y: number };
  sounds: Sounds;
  constructor(
    width: number,
    height: number,
    collisionPoints: { x: number; y: number }[],
    platformPoints: { x: number; y: number }[]
  ) {
    this.background = new Background(this);
    this.keys = [];
    this.height = height;
    this.width = width;
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.floorBlocks = [];
    this.scaleCanvasY = this.height / 4;
    this.scaleCanvasX = this.width / 4;
    this.sounds = new Sounds();
    this.camera = {
      x: 0,
      y: -this.background.image.height + this.scaleCanvasY,
    };
    this.cameraBox = {
      x: this.player.x - this.player.width * 0.5,
      y: this.player.y,
      height: 90,
      width: 150,
    };
    this.floorBlocks = collisionPoints.map((point) => {
      return new Collisionblock(this, point.x * 16, point.y * 16, 16);
    });
    this.platformBlocks = platformPoints.map((point) => {
      return new Collisionblock(this, point.x * 16, point.y * 16, 4);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.scale(4, 4);
    ctx.translate(this.camera.x, this.camera.y);
    this.background.draw(ctx);
    this.player.draw(ctx);
    ctx.restore();
  }
  update() {
    this.player.update();
    this.cameraBox = {
      x: this.player.x - this.player.width * 0.5,
      y: this.player.y,
      height: 84,
      width: 150,
    };
  }
  panLeft() {
    const cameraBoxRight = this.cameraBox.x + this.cameraBox.width;
    if (cameraBoxRight >= 576) return;
    if (cameraBoxRight >= this.width / 4 + Math.abs(this.camera.x)) {
      this.camera.x -= this.player.speedX;
    }
  }

  panRight() {
    if (this.cameraBox.x <= 0) return;
    if (this.cameraBox.x <= Math.abs(this.camera.x)) {
      this.camera.x -= this.player.speedX;
    }
  }
  panDown() {
    if (this.cameraBox.y + this.player.speedY <= 0) return;
    if (this.cameraBox.y <= Math.abs(this.camera.y)) {
      this.camera.y -= this.player.speedY;
    }
  }

  panUp() {
    if (
      this.cameraBox.y + this.cameraBox.height + Math.abs(this.player.speedY) >=
      373
    )
      return;

    if (this.cameraBox.y + this.cameraBox.y >= Math.abs(this.camera.y)) {
      this.camera.y -= this.player.speedY;
    }
  }
}
