import { floorCollisionArray, platformCollisionArray } from "./Collisions.ts";
import { Game } from "./Game.ts";

window.addEventListener("load", () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const CTX = <CanvasRenderingContext2D>canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 1024);
  const CANVAS_HEIGHT = (canvas.height = 576);
  const floorcollisions = [];
  for (let i = 0; i < 27; i++) {
    let row = [];
    for (let j = 0; j < 36; j++) {
      row.push(floorCollisionArray.shift());
    }
    floorcollisions.push(row);
  }

  const floorPoints: { x: number; y: number }[] = [];
  floorcollisions.forEach((row, y) => {
    row.forEach((point, x) => {
      if (point === 202) floorPoints.push({ x, y });
    });
  });
  const platformCollisions = [];
  for (let i = 0; i < 27; i++) {
    let row = [];
    for (let j = 0; j < 36; j++) {
      row.push(platformCollisionArray.shift());
    }
    platformCollisions.push(row);
  }

  const platformPoints: { x: number; y: number }[] = [];
  platformCollisions.forEach((row, y) => {
    row.forEach((point, x) => {
      if (point !== 0) platformPoints.push({ x, y });
    });
  });
  const game = new Game(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    floorPoints,
    platformPoints
  );

  function animate() {
    game.draw(CTX);
    game.update();
    requestAnimationFrame(animate);
  }
  animate();
});
