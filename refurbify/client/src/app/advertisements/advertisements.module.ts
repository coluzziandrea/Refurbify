import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementsRoutingModule } from './advertisements.routing.module';
import { AdListComponent } from './ad-list/ad-list.component';
import { AngularMaterialModule } from '../angular-material.module';
@NgModule({
  declarations: [AdListComponent],
  imports: [CommonModule, AdvertisementsRoutingModule, AngularMaterialModule],
  exports: [AdListComponent],
})
export class AdvertisementsModule {}
