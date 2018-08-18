import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from './../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;    
  }

  onAddToFavorites(quote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quotesService.addQuoteToFavorites(quote);
          }
        },
        {
          text: 'No, I changed my mind',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote): boolean {
    return this.quotesService.isQuoteFavorite(quote);
  }
}
