import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { PlacePage } from "../place/place";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  places: Place[] = [];

  constructor(
    public modalCtrl: ModalController,
    private placesService: PlacesService) {}

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then((places: Place[]) => {
        this.places = places;
      });
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, { place, index });
    modal.present();
  }
}
