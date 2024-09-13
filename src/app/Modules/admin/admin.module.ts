import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Material/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DatePipe } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';
import { StudentRecordComponent } from './student-record/student-record.component';
import { BulkStudentRegisterComponent } from './bulk-student-register/bulk-student-register.component';
import { ViewPhotoComponent } from './view-photo/view-photo.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';
import { DialogEditWebinarComponent } from './dialog-edit-webinar/dialog-edit-webinar.component';
import { UploadZoomFileComponent } from './upload-zoom-file/upload-zoom-file.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { StudentBatchListComponent } from './student-batch-list/student-batch-list.component';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    ViewAssignmentComponent,
    CreateWebinarComponent,
    StudentRecordComponent,
    BulkStudentRegisterComponent,
    ViewPhotoComponent,
    EditStudentComponent,
    AssignmentDialogComponent,
    EditWebinarComponent,
    DialogEditWebinarComponent,
    UploadZoomFileComponent,
    CreateBatchComponent,
    StudentBatchListComponent,
    UploadQuizComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }
