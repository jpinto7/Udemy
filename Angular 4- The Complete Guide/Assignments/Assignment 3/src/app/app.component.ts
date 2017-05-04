import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showParagraph = false;
  buttonClicks = [];

  displayDetails() {
    this.showParagraph = !this.showParagraph;
    this.buttonClicks.push(new Date());
  }

  applyBlueBackground(index) {
    if (index >= 4) {
      return {
        backgroundColor: 'blue',
      };
    }
  }

  applyWhiteColor(index) {
    if (index >= 4) {
      return true;
    }
  }
}
