import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { UserHomeComponent } from './home/user-home.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AdvertisementsModule } from '../advertisements/advertisements.module';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';

@NgModule({
  declarations: [UserHomeComponent, MyAdvertisementsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    AdvertisementsModule,
  ],
})
export class UserModule {}
