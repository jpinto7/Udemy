import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {
  quote: Quote;
  
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    this.quote = this.navParams.get('quote');
  }

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }
}
