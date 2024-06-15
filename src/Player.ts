import { Collisionblock } from "./CollisionBlock.js";
import { Game } from "./Game.js";
interface HitBox {
  height: number;
  width: number;
  x: number;
  y: number;
}
interface Animations {
  idle: { src: any; frames: number };
  run: { src: any; frames: number };
  runLeft: { src: any; frames: number };
  idleLeft: { src: any; frames: number };
  jumpLeft: { src: any; frames: number };
  jumpRight: { src: any; frames: number };
  fallLeft: { src: any; frames: number };
  fallRight: { src: any; frames: number };
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
  animation: Animations;
  direction: string;
  maxFrame: number;
  jump: number;
  constructor(game: Game) {
    this.gravity = 0.1;
    this.frameX = 0;
    this.frameY = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.game = game;
    this.maxFrame = 8;
    this.direction = "right";
    this.y = 300;
    this.x = 70;
    this.jump = 0;
    this.keys = {
      keyLeft: false,
      keyRight: false,
    };
    this.fps = 5;
    this.image = document.getElementById("idle");
    this.animation = {
      idle: {
        src: document.getElementById("idle"),
        frames: 8,
      },
      idleLeft: {
        src: document.getElementById("IdleLeft"),
        frames: 8,
      },
      run: {
        src: document.getElementById("Run"),
        frames: 8,
      },
      runLeft: {
        src: document.getElementById("RunLeft"),
        frames: 8,
      },
      jumpRight: {
        src: document.getElementById("Jump"),
        frames: 2,
      },
      jumpLeft: {
        src: document.getElementById("JumpLeft"),
        frames: 2,
      },

      fallRight: {
        src: document.getElementById("Fall"),
        frames: 2,
      },
      fallLeft: {
        src: document.getElementById("FallLeft"),
        frames: 2,
      },
    };
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
  swapSprite(src: any, frames: number) {
    if (this.image === src) return;
    this.maxFrame = frames;
    this.image = src;
  }
  draw(ctx: CanvasRenderingContext2D) {
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
    this.updateFrame();
    this.playerMove();
    this.movePlayer();
    this.updateHitBox();
    this.checkForHorozontalCollision();
    this.x += this.speedX;
    this.applyGravity();
    this.updateHitBox();
    this.checkForVerticalCollision();
    // this.stopBreath();
    this.run();
    this.breath();
    // this.playerJump();
    // this.playerMotion();
  }
  updateHitBox() {
    this.hitBox = {
      height: 27,
      width: 13,
      x: this.x + 35,
      y: this.y + 25,
    };
  }
  breath() {
    if (this.speedX === 0 && this.speedY === 0) {
      this.game.sounds.playBreath();
    } else this.game.sounds.stopBreath();
  }

  run() {
    if ((this.speedX > 0 || this.speedX < 0) && this.speedY === 0)
      this.game.sounds.playRun();
    else this.game.sounds.stopRun();
  }

  // playerJump() {
  //   if (this.speedY < 0)
  //   else this.game.sounds.stopJump();
  // }

  updateFrame() {
    if (this.staggerFrame % this.fps == 0) {
      if (this.frameX < this.maxFrame - 1) this.frameX++;
      else this.frameX = 0;
    }
    this.staggerFrame++;
  }
  movePlayer() {
    if (this.keys.keyLeft && this.hitBox.x + Math.abs(this.speedX) >= 12)
      this.speedX = -5;
    else if (
      this.keys.keyRight &&
      this.hitBox.x + this.hitBox.width + this.speedX < 576
    )
      this.speedX = 5;
    else {
      this.speedX = 0;
    }
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
          this.y = block.y + block.height - offset + 0.01;
          return;
        }
      }
    });

    this.game.platformBlocks.forEach((block) => {
      if (this.checkPlatformCollision(this.hitBox, block)) {
        if (this.speedY > 0) {
          this.speedY = 0;
          const offset = this.hitBox.y - this.y + this.hitBox.height;
          this.y = block.y - offset - 0.01;
          return;
        }
      }
    });
  }

  checkForHorozontalCollision() {
    this.game.floorBlocks.forEach((block) => {
      if (this.checkFloorCollision(this.hitBox, block)) {
        if (this.speedX > 0) {
          const offset = this.hitBox.x - this.x + this.hitBox.width;
          this.speedX = 0;
          this.x = block.x - offset - 0.01;
          return;
        }
        if (this.speedX < 0) {
          this.speedX = 0;
          const offset = this.hitBox.x - this.x;
          this.x = block.x + block.width - offset + 0.01;
          return;
        }
      }
    });
  }

  applyGravity() {
    this.speedY += this.gravity;
    this.y += this.speedY;
  }
  playerMove() {
    if (this.game.keys.includes("ArrowUp")) {
      this.game.keys = this.game.keys.filter((key) => key !== "ArrowUp");
      this.game.sounds.playJump();
      this.game.sounds.jump.currentTime = 0;
      this.speedY = -2;
    } else if (this.game.keys.includes("ArrowLeft")) {
      this.game.panRight();
      this.keys.keyLeft = true;
      this.direction = "left";
      this.swapSprite(
        this.animation.runLeft.src,
        this.animation.runLeft.frames
      );
    } else if (this.game.keys.includes("ArrowRight")) {
      this.game.panLeft();
      this.direction = "right";
      this.keys.keyRight = true;
      this.swapSprite(this.animation.run.src, this.animation.run.frames);
    } else if (this.speedY === 0) {
      if (this.direction === "right") {
        this.swapSprite(this.animation.idle.src, this.animation.idle.frames);
      } else {
        if (this.direction === "left") {
          this.swapSprite(
            this.animation.idleLeft.src,
            this.animation.idleLeft.frames
          );
        }
      }
    }
    if (this.speedY < 0) {
      this.game.panDown();
      if (this.direction === "right")
        this.swapSprite(
          this.animation.jumpRight.src,
          this.animation.jumpRight.frames
        );
      else if (this.direction === "left")
        this.swapSprite(
          this.animation.jumpLeft.src,
          this.animation.jumpLeft.frames
        );
    } else if (this.speedY > 0) {
      this.jump = 0;
      this.game.panUp();
      if (this.direction === "right")
        this.swapSprite(
          this.animation.fallRight.src,
          this.animation.fallRight.frames
        );
      else if (this.direction === "left")
        this.swapSprite(
          this.animation.fallLeft.src,
          this.animation.fallLeft.frames
        );
    }
  }
  checkFloorCollision(player: HitBox, block: Collisionblock) {
    return (
      player.y + player.height >= block.y &&
      player.y <= block.y + block.height &&
      player.x <= block.x + block.width &&
      player.x + player.width >= block.x
    );
  }

  checkPlatformCollision(player: HitBox, block: Collisionblock) {
    return (
      player.y + player.height >= block.y &&
      player.y + player.height <= block.y + block.height &&
      player.x <= block.x + block.width &&
      player.x + player.width >= block.x
    );
  }
}
