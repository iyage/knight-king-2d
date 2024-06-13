import { Collisionblock } from "./CollisionBlock.js";
import { Game } from "./Game.js";
interface HitBox {
  height: number;
  width: number;
  x: number;
  y: number;
}
export class Player {
  height: number;
  width: number;
  gravity: number;
  frameX: number;
  frameY: number;
  speedY: number;
  speedX: number;
  game: Game;
  y: number;
  x: number;
  keys: { keyLeft: boolean; keyRight: boolean };
  image: any;
  fps: number;
  staggerFrame: number;
  hitBox: HitBox;
  constructor(game: Game) {
    this.gravity = 0.3;
    this.frameX = 0;
    this.frameY = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.game = game;
    this.y = 0;
    this.x = 100;
    this.keys = {
      keyLeft: false,
      keyRight: false,
    };
    this.fps = 4;
    this.image = document.getElementById("idle");
    this.height = this.image.height;
    this.width = this.image.width / 8;
    this.staggerFrame = 0;
    this.hitBox = {
      height: 10,
      width: 10,
      x: this.x,
      y: this.y,
    };
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,255,0.2)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //box
    ctx.fillStyle = "rgba(0,255,0,0.2)";
    ctx.fillRect(
      this.hitBox.x,
      this.hitBox.y,
      this.hitBox.width,
      this.hitBox.height
    );
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.staggerFrame % this.fps == 0) {
      if (this.frameX < 7) this.frameX++;
      else this.frameX = 0;
    }
    this.staggerFrame++;

    this.x += this.speedX;
    this.updateHitBox();
    this.checkForHorozontalCollision();
    if (this.keys.keyLeft) this.speedX = -5;
    else if (this.keys.keyRight) this.speedX = 5;
    else this.speedX = 0;
    this.applyGravity();
    this.checkForVerticalCollision();
  }
  updateHitBox() {
    this.hitBox = {
      height: 27,
      width: 14,
      x: this.x + 35,
      y: this.y + 25,
    };
  }

  checkForVerticalCollision() {
    this.game.floorBlocks.forEach((block) => {
      if (this.checkFloorCollision(this.hitBox, block)) {
        if (this.speedY > 0) {
          this.speedY = 0;
          const offset = this.hitBox.y - this.y + this.hitBox.height;
          this.y = block.y - offset - 0.01;
          return;
        }
        if (this.speedY < 0) {
          this.speedY = 0;
          const offset = this.hitBox.y - this.y;
          this.y = block.y + offset + 0.01;
          return;
        }
      }
    });
  }

  checkForHorozontalCollision() {
    this.game.floorBlocks.forEach((block) => {
      if (this.checkFloorCollision(this.hitBox, block)) {
        // this.speedX = 0;
        // this.x = block.x + block.width;
        // return;
        if (this.speedX > 0) {
          const offset = this.hitBox.x - this.x + this.hitBox.width;
          this.speedX = 0;
          this.x = block.x - offset - 0.01;
          return;
        }
        if (this.speedX < 0) {
          this.speedX = 0;
          const offset = this.hitBox.x - this.x;
          this.x = block.x + offset + 0.01;
          return;
        }
      }
    });
  }

  applyGravity() {
    this.y += this.speedY;
    this.speedY += this.gravity;
  }
  playerMove(key: string) {
    if (key === "ArrowUp") {
      this.speedY = -5;
    } else if (key === "ArrowLeft") this.keys.keyLeft = true;
    else if (key === "ArrowRight") this.keys.keyRight = true;
  }
  playerStop(key: string) {
    if (key === "ArrowLeft") this.keys.keyLeft = false;
    else if (key === "ArrowRight") this.keys.keyRight = false;
  }
  checkFloorCollision(player: HitBox, block: Collisionblock) {
    return (
      player.y + player.height >= block.y &&
      player.y <= block.y + block.height &&
      player.x <= block.x + block.width &&
      player.x + player.width >= block.x
    );
  }
}
