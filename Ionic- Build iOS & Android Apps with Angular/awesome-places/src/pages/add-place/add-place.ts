import { Location } from '../../models/location';
import { SetLocationPage } from '../set-location/set-location';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, ToastController, normalizeURL } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from "@ionic-native/camera";
import { PlacesService } from "../../services/places";
import { Entry, File, FileError } from "@ionic-native/file";

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    latitude: 40.7624324,
    longitude: -73.9759827
  };
  imageUrl = '';
  locationIsSet = false;

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private camera: Camera,
    private file: File,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {}

  onSubmit(f: NgForm) {
    const {
      title = '',
      description = ''
    } = f.value;
    this.placesService.addPlace(title, description, this.imageUrl, this.location);
    f.reset();
    this.location = {
      latitude: 40.7624324,
      longitude: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(location => {
        loader.dismiss();
        this.location.longitude = location.coords.longitude;
        this.location.latitude = location.coords.latitude;
        this.locationIsSet = true;
      })
      .catch(error => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could not get location, please pick it manually',
          duration: 2500
        });
        toast.present();
      });
  }

  onTakePhoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true
    })
      .then(imageData => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then((data: Entry) => {
            this.imageUrl = normalizeURL(data.nativeURL);
            this.camera.cleanup();
          })
          .catch((error: FileError) => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save the image. Please try again',
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
