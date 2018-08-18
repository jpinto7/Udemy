import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacePage } from './place';
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
    AgmCoreModule
  ],
})
export class PlacePageModule {}
