import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  UserId: number = 0;
  loader:boolean=false;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private shareService: ShareService
  ) {
    this.UserId = this.shareService.currentUser.userid;
  }

  feedbackForm: FormGroup = this.fb.group({ //Register Method
    UserId: [''],
    feedbackText: ['',Validators.required],
    rate:['',Validators.required]
  })

  feedbackComplaint() {
    this.loader =true;
    this.feedbackForm.patchValue({
      UserId: this.UserId
    })

    if(!this.feedbackForm.valid){
      this.loader =false;
      return;
    }

    this.studentService.feedback('student/feedback', this.feedbackForm.value).subscribe((res: any) => {
      this.loader =false;
      if (res.status == 800) {
        Swal.fire({ icon: 'success', text: "Submitted Successfuly", timer: 3000 });
        this.feedbackForm.reset();
      } else if (res.status == 302) {
        Swal.fire({ icon: 'error', text: 'Validation Error', timer: 3000 });
      }
      else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 });
      }
    });
  }

}
