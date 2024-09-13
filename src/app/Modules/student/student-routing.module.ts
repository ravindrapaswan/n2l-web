import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { WebinarComponent } from './webinar/webinar.component';
import { PointsDetailComponent } from './points-detail/points-detail.component';

const routes: Routes = [
  {path:'dashboard',component:StudentDashboardComponent},
  {path:'profile',component:StudentProfileComponent},
  {path:'uploadAssignment',component:UploadAssignmentComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'webinar',component:WebinarComponent},
  {path:'pointsDetail',component:PointsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
