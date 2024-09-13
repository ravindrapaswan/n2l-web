import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Added
import { MaterialModule } from 'src/app/Material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { WebinarRoutingModule } from './webinar-routing.module';
import { RegisterViewComponent } from './register-view/register-view.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  declarations: [
    RegisterViewComponent,
    VideoViewComponent
  ],
  imports: [
    CommonModule,
    WebinarRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class WebinarModule { }
