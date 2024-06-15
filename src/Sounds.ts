export class Sounds {
  breath: HTMLAudioElement;
  run: HTMLAudioElement;
  jump: HTMLAudioElement;
  constructor() {
    this.breath = <HTMLAudioElement>document.getElementById("breath");
    this.run = <HTMLAudioElement>document.getElementById("run");
    this.jump = <HTMLAudioElement>document.getElementById("jump");
  }
  playBreath() {
    this.breath.play();
    this.breath.volume = 0.2;
  }

  stopBreath() {
    this.breath.pause();
  }

  playRun() {
    this.run.play();
    this.run.volume = 1;
  }

  stopRun() {
    this.run.pause();
  }

  playJump() {
    this.jump.play();
    this.jump.volume = 0.8;
  }

  stopJump() {
    this.jump.pause();
  }
}
