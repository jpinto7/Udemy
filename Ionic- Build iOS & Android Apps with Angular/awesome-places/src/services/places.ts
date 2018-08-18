import { normalizeURL } from 'ionic-angular';
import { Place } from "../models/place";
import { Location } from "../models/location";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(
    private storage: Storage,
    private file: File) {}

  addPlace(title: string, description: string, imageUrl: string, location: Location) {
    const newPlace = new Place(title, description, normalizeURL(imageUrl), location);
    this.places.push(newPlace);
    this.storage.set('places', this.places)
      .then()
      .catch(error => {
        this.places.splice(this.places.indexOf(newPlace), 1);
      });
  }

  loadPlaces(): Place[] {
    return [...this.places];
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then((places: Place[]) => {
        this.places = places != null ? places : [];
        return this.places;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(() => {
        console.log('Removed File');
      })
      .catch(() => {
        console.log('Error while removing the file');
        this.addPlace(place.title, place.description, place.imageUrl, place.location);
      });
  }
}
