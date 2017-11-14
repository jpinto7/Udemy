import { OnInit, Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyBnogRyONlYRl6_wftL_mWzswpXcyum_Q0',
      authDomain: 'ng-recipe-book-7af53.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-7af53.firebaseio.com',
      projectId: 'ng-recipe-book-7af53',
      storageBucket: 'ng-recipe-book-7af53.appspot.com',
      messagingSenderId: '29337916054'
    };
    firebase.initializeApp(config);
  }
}
