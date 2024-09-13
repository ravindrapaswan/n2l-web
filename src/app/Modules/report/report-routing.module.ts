import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentWiseTotalNoOfPracticesComponent } from './student-wise-total-no-of-practices/student-wise-total-no-of-practices.component';
import { ActiveInactiveStudentsComponent } from './active-inactive-students/active-inactive-students.component';
import { SummryReportComponent } from './summry-report/summry-report.component';
import { ExceptionReportComponent } from './exception-report/exception-report.component';
import { OnDateStudentWiseNoOfPracticesComponent } from './on-date-student-wise-no-of-practices/on-date-student-wise-no-of-practices.component';

const routes: Routes = [
  {path:'totalNoOfPractices',component:StudentWiseTotalNoOfPracticesComponent},
  {path:'totalNoOfPracticesByDate',component:OnDateStudentWiseNoOfPracticesComponent},
  {path:'activeInactiveStudents', component:ActiveInactiveStudentsComponent},
  {path:'summryReport', component:SummryReportComponent},
  {path:'execptionReport', component:ExceptionReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
