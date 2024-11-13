import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Material/material/material.module';

import { ReportRoutingModule } from './report-routing.module';
import { StudentWiseTotalNoOfPracticesComponent } from './student-wise-total-no-of-practices/student-wise-total-no-of-practices.component';
import { ActiveInactiveStudentsComponent } from './active-inactive-students/active-inactive-students.component';
import { SummryReportComponent } from './summry-report/summry-report.component';
import { ExceptionReportComponent } from './exception-report/exception-report.component';
import { OnDateStudentWiseNoOfPracticesComponent } from './on-date-student-wise-no-of-practices/on-date-student-wise-no-of-practices.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    StudentWiseTotalNoOfPracticesComponent,
    SummryReportComponent,
    ExceptionReportComponent,
    OnDateStudentWiseNoOfPracticesComponent,
    ActiveInactiveStudentsComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,


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
    MatSortModule,
    FormsModule,
  ]
})
export class ReportModule { }
