import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  SharedModule,
  MatToolbarModule,
  MatButtonModule,
];

const COMPONENTS = [HeaderComponent, LayoutComponent];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class CoreModule {}
