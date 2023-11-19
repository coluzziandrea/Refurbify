import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './home/user-home.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserHomeComponent,
  },
  {
    path: 'my-advertisements',
    component: MyAdvertisementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
