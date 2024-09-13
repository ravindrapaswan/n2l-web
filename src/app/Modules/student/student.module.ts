import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Material/material/material.module';
import { DatePipe } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { WebinarComponent } from './webinar/webinar.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { PointsDetailComponent } from './points-detail/points-detail.component';


@NgModule({
  declarations: [
    UploadAssignmentComponent,
    StudentDashboardComponent,
    FeedbackComponent,
    StudentProfileComponent,
    WebinarComponent,
    EditViewComponent,
    PointsDetailComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [DatePipe]
})
export class StudentModule { }
