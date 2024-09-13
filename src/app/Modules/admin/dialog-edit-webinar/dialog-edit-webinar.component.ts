import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/Services/admin.service';
import { WebinarService } from 'src/app/Services/webinar.service';

@Component({
  selector: 'app-dialog-edit-webinar',
  templateUrl: './dialog-edit-webinar.component.html',
  styleUrls: ['./dialog-edit-webinar.component.css']
})
export class DialogEditWebinarComponent {

  loader: boolean = false;
  webinarid: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private adminService: AdminService,
    private webinarService: WebinarService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {
    // this.dialogRef.updateSize('60%', '80%');
    this.webinarid = this.data.webinarid;
    this.getWebinarById();
  }

  //Dialog Change as per Screen Size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.logScreenSize();
  }
  logScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
    } else {
      this.dialogRef.updateSize('60%', '70%');
    }
  }

  ngOnInit(): void {
    // this.dialogRef.updateSize('50%','75%');
    this.logScreenSize();
  }

  WebinarForm: FormGroup = this.fb.group({ //Register Method
    Topic: ['', Validators.required],
    Duration: ['', Validators.required],
    Date: ['', Validators.required],
    StartTime: ['', Validators.required],
    Description: ['', Validators.required],
    ZoomLink: ['', Validators.required]
  });

  getWebinarById() {
    this.loader = true;
    this.adminService.getWebinarById('webinar/getWebinar/' + this.webinarid).subscribe((res: any) => {
      const formattedDate = this.datePipe.transform(res.data[0].date, 'yyyy-MM-dd');

      if (res.ResponseCode == 800) {
        this.loader = false;
        this.WebinarForm.patchValue({
          Topic: res.data[0].topic,
          Duration: res.data[0].duration,
          Date: formattedDate,
          StartTime: res.data[0].starttime,
          Description: res.data[0].description,
          ZoomLink: res.data[0].zoomlink
        })
      }
    })
  }

  Banner: any;
  BannerFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Banner = file;
    }
  }

  Video: any;
  VideoFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Video = file;
    }
  }


  UpdateWebinar() {
    this.loader = true;
    const formattedDate = this.datePipe.transform(this.WebinarForm.value.Date, 'yyyy-MM-dd');
    this.WebinarForm.patchValue({
      Date: formattedDate
    })
    const formData = new FormData();
    formData.append('Banner', this.Banner);
    formData.append('Video', this.Video);

    if (this.WebinarForm.valid) {
      this.webinarService.UpdateWebinar('webinar/UpdateWebinar/' + this.webinarid, formData, this.WebinarForm.value).subscribe((res: any) => {
        if (res.status == 800) {
          Swal.fire({ icon: 'success', text: "Webinar Updated Successfuly", timer: 3000 });
          this.dialogRef.close();
          this.loader = false;
        } else if (res.status == 302) {
          Swal.fire({ icon: 'error', text: 'Validation Error', timer: 3000 })
          this.dialogRef.close();
          this.loader = false;
        }
        else {
          Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 })
          this.dialogRef.close();
          this.loader = false;
        }
      })
    } else {
      Swal.fire({ icon: 'error', text: 'All fields required', timer: 3000 })
      this.loader = false;
    }

  }


}
