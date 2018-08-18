import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesPage } from './../favorites/favorites';
import { LibraryPage } from './../library/library';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  favoritesPage: any = FavoritesPage;
  libraryPage: any = LibraryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
