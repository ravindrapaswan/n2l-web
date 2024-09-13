import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterViewComponent } from 'src/app/Modules/webinar/register-view/register-view.component';
import { VideoViewComponent } from 'src/app/Modules/webinar/video-view/video-view.component';

// Services
import { UserService } from 'src/app/Services/user.service';
import { ShareService } from 'src/app/Services/share.service';
import { WebinarService } from 'src/app/Services/webinar.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Variables
  apiUrl: string = environment.apiUrl;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shareService: ShareService,
    private webinarService: WebinarService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getWebinar();
  }

  loginForm: FormGroup = this.fb.group({ //Method Define Login
    MobileNumber: ['', Validators.required],
    password: ['', Validators.required]
  });

  IsLogin: boolean = false;

  install() { //login Method

    Swal.fire({
      position: "center",
      icon: "info",
      title: "App will come soon",
      showConfirmButton: false,
      timer: 3000
    });
  }
  async login() { //login Method

    await localStorage.clear();  // clearing old catche*************** for quick login
    await sessionStorage.clear(); // clearing old session*************** for quick login

    // Validation Check
    if (!this.loginForm.valid) {
      Swal.fire({ icon: 'error', text: 'All fields required', timer: 2000 })
      return;
    }

    // Call API for Login
    this.userService.loginFunction('users/login', this.loginForm.value).subscribe((res: any) => {

      if (res.ResponseCode == 800) {
        //Send token to Share Service
        this.shareService.login(res.token);

        // Route a s per teacher_student Role
        if (res.teacher_student == 1) {
          this.router.navigate(['/student/dashboard']);
        } else if (res.teacher_student == 2) {
          this.router.navigate(['/admin/adminDashboard']);
        }
        // window.location.reload(); //added new code***************

      } else if (res.ResponseCode == 300) {
        Swal.fire({ icon: 'error', text: 'Wrong Id Password', timer: 5000 })
      } else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 5000 })
      }
    })
  }

  webinars: any[] = [];  //store the webinar data

  // Get Webinar for Home
  getWebinar() {
    // Call get webinar API
    this.webinarService.getWebinar('webinar/getWebinarForHome').subscribe((res: any) => {
      if (res.ResponseCode === 800) {

        // fill webinar data on webinars array
        this.webinars = res.data;

      } else if (res.ResponseCode === 300) {
        console.log('Data not found');
      } else {
        console.log('Something went wrong');
      }
    });

  }

  //Dialog Box Opener Functions open modal
  RegisterInWebinar(webinarid: number, topic: string) {
    const dialogRef = this.dialog.open(RegisterViewComponent, { data: { webinarid, topic } });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Webinar Video modal pass url
  ViewWebinarVideo(path: string) {
    const dialogRef = this.dialog.open(VideoViewComponent, { data: { path } });
    dialogRef.afterClosed().subscribe(result => {
    });
  }



}
