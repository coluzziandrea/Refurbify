import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandComponent } from './land/land.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LandComponent,
    ContactsComponent,
    AboutComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, CoreModule, MatButtonModule],
})
export class HomeModule {}
