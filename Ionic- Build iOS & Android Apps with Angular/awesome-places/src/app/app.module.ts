import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from "@ionic-native/geolocation";
import { Camera } from '@ionic-native/camera';
import { File } from "@ionic-native/file";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { SetLocationPageModule } from "../pages/set-location/set-location.module";
import { PlacesService } from "../services/places";
import { HomePageModule } from "../pages/home/home.module";
import { PlacePageModule } from "../pages/place/place.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMy4k4qyxew7eqzTzoROHDbGz2LQ35xYo'
    }),
    PlacePageModule,
    HomePageModule,
    SetLocationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    PlacesService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
