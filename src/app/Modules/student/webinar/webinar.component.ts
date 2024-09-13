import { Component } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { RegisterViewComponent } from '../../webinar/register-view/register-view.component';
import { VideoViewComponent } from '../../webinar/video-view/video-view.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent {
  loader: boolean = false;
  userid: number = 0;
  constructor(private studentService: StudentService,
    private shareService: ShareService,
    public dialog: MatDialog) {
    this.userid = this.shareService.currentUser.userid;
  }

  ngOnInit() {
    this.getWebinar();
  }

  apiUrl: string = environment.apiUrl;

  webinars: any[] = [];  //store the webinar data

  isRegistered: boolean = false;

  getWebinar() {
    this.loader = true;
    this.studentService.getWebinar('webinar/getWebinar').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode === 800) {
        this.webinars = res.data;
      } else {
        console.log('Something went wrong');
      }
    });
  }

  //Dialog Box Opener Functions
  RegisterInWebinar(webinarid: number, topic: string, studentid: number) {
    const dialogRef = this.dialog.open(RegisterViewComponent, { data: { webinarid, topic, studentid } });
    dialogRef.afterClosed().subscribe(result => {
      this.getWebinar();
    });
  }

  ViewWebinarVideo(awsUrl: string, videolink: string) {
    const path = awsUrl + videolink;
    const dialogRef = this.dialog.open(VideoViewComponent, { data: { path } });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
