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

@NgModule({
  declarations: [
    StudentWiseTotalNoOfPracticesComponent,
    ActiveInactiveStudentsComponent,
    SummryReportComponent,
    ExceptionReportComponent,
    OnDateStudentWiseNoOfPracticesComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ReportModule { }
