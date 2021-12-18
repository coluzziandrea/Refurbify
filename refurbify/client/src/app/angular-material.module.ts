import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatCommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class AngularMaterialModule {}
