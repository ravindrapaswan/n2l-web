import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './FrontComponents/home/home.component';
import { AboutComponent } from './FrontComponents/about/about.component';
import { FAQComponent } from './FrontComponents/faq/faq.component';
import { InstallComponent } from './FrontComponents/install/install.component';
import { RegisterComponent } from './FrontComponents/register/register.component';
import { ForgetPasswordComponent } from './FrontComponents/forget-password/forget-password.component';
import { TeacherGuard } from './guard/teacher.guard';
import { ContactComponent } from './FrontComponents/contact/contact.component';
import { PrivacyPolicyComponent } from './FrontComponents/privacy-policy/privacy-policy.component';

const routes: Routes = [ //Routes Define
 {path:'', redirectTo:'home', pathMatch:'full'}, //Default Route

  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'faq', component:FAQComponent},
  {path:'install', component:InstallComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'contact', component:ContactComponent},
  {path:'privacy_policy',component:PrivacyPolicyComponent},


  //Lazy Loading Module Routes
  {path: 'student', loadChildren:()=> import('./Modules/student/student.module').then(m=>m.StudentModule)},
  {path: 'teacher', loadChildren:()=> import('./Modules/teacher/teacher.module').then(m=>m.TeacherModule),canActivate:[TeacherGuard]},
  {path: 'admin', loadChildren:()=> import('./Modules/admin/admin.module').then(m=>m.AdminModule),canActivate:[TeacherGuard]},
  {path: 'report', loadChildren:()=> import('./Modules/report/report.module').then(m=>m.ReportModule)},
  {path: 'webinar', loadChildren:()=> import('./Modules/webinar/webinar.module').then(m=>m.WebinarModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
