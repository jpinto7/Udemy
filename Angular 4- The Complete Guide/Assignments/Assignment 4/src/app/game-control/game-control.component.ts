import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() start = new EventEmitter<number>();
  ticks = 0;
  interval;

  constructor() { }

  startGame() {
    this.interval = setInterval(() => {
      this.start.emit(this.ticks + 1);
      this.ticks++;
    }, 1000);
  }

  stopGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
