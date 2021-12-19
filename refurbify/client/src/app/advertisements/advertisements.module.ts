import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementsRoutingModule } from './advertisements.routing.module';
import { AdListComponent } from './ad-list/ad-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdListComponent, CreateComponent, SearchComponent],
  imports: [
    CommonModule,
    AdvertisementsRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
  exports: [AdListComponent],
})
export class AdvertisementsModule {}
