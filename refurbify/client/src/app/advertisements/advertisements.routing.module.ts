import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { ShowAdvertisementComponent } from './show-advertisement/show-advertisement.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: ':id',
    component: ShowAdvertisementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisementsRoutingModule {}
