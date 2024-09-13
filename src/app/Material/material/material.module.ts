import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';



const matConst =[
CommonModule,
MatSidenavModule,
MatToolbarModule,
MatIconModule,
MatButtonModule,
MatListModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatTableModule,
MatPaginatorModule,
MatDialogModule,
MatMenuModule,
MatProgressSpinnerModule,
MatDatepickerModule,
MatNativeDateModule,
MatCheckboxModule,
MatSortModule
];


@NgModule({
  imports: matConst,
  exports: matConst
})
export class MaterialModule { }
