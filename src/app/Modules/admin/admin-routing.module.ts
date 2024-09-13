import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkStudentRegisterComponent } from './bulk-student-register/bulk-student-register.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { StudentRecordComponent } from './student-record/student-record.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';
import { UploadZoomFileComponent } from './upload-zoom-file/upload-zoom-file.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'ExcelToStudentRegister',component:BulkStudentRegisterComponent},
  {path:'CreateWebinar', component:CreateWebinarComponent},
  {path:'ViewAssignment', component:ViewAssignmentComponent},
  {path:'StudentList', component:StudentRecordComponent},
  {path:'EditWebinar', component:EditWebinarComponent},
  {path:'UploadZoomFile', component:UploadZoomFileComponent},
  {path:'batch', component:CreateBatchComponent},
  {path:'UploadQuiz', component:UploadQuizComponent},
  {path:'adminDashboard', component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
