import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementsRoutingModule } from './advertisements.routing.module';
import { AdListComponent } from './ad-list/ad-list.component';
@NgModule({
  declarations: [AdListComponent],
  imports: [CommonModule, AdvertisementsRoutingModule],
  exports: [AdListComponent],
})
export class AdvertisementsModule {}
