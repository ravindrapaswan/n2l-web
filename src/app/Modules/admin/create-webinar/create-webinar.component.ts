import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebinarService } from 'src/app/Services/webinar.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-create-webinar',
  templateUrl: './create-webinar.component.html',
  styleUrls: ['./create-webinar.component.css']
})
export class CreateWebinarComponent {

  @ViewChild('WebinarPhoto') WebinarPhoto!: ElementRef;
  @ViewChild('WebinarVideo') WebinarVideo!: ElementRef;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  WebinarForm: FormGroup = this.fb.group({ //Register Method
    Topic: ['', Validators.required],
    Duration: ['', Validators.required],
    Date: ['', Validators.required],
    StartTime: ['', Validators.required],
    Description: ['', Validators.required],
    ZoomLink: ['', Validators.required],
    UserId: ['']
  })
  picker: any;
  loader:boolean = false;
  userid: number = 0;

  constructor(
    private webinarService: WebinarService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private shareService: ShareService
  ) {
    this.userid = this.shareService.currentUser.userid;
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

  resetCompleteForm() {
    this.WebinarPhoto.nativeElement.value = '';
    this.WebinarVideo.nativeElement.value = '';
    this.formDirective.resetForm();
  }

  CreateWebinar() {
    this.loader = true;

    const formattedDate = this.datePipe.transform(this.WebinarForm.value.Date, 'yyyy-MM-dd');

    this.WebinarForm.patchValue({
      Date: formattedDate,
      UserId: this.userid
    })

    const formData = new FormData();
    formData.append('Banner', this.Banner);
    formData.append('Video', this.Video);


    if (!this.WebinarForm.valid) {
      Swal.fire({ icon: 'error', text: 'All fields required', timer: 4000 })
      this.loader = false;
      return;
    }

    this.webinarService.CreateWebinar('webinar/CreateWebinar', formData, this.WebinarForm.value).subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        Swal.fire({ icon: 'success', text: "Webinar Created Successfuly", timer: 3000 });
        this.resetCompleteForm();
        this.loader = false;
      } else if (res.ResponseCode == 302) {
        Swal.fire({ icon: 'error', text: 'Validation Error', timer: 3000 });
        this.loader = false;
      }
      else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 })
        this.loader = false;
      }
    })

  }

}
