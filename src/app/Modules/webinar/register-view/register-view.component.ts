import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebinarService } from 'src/app/Services/webinar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {

  loader: boolean = false;
  webinarId: number = 0
  studentid: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>,
    private webinarService: WebinarService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    // this.dialogRef.updateSize('50%','50%');
    this.ModalLoading();
  }

  ModalLoading(){
    this.webinarId = this.data.webinarid;
    this.studentid = this.data.studentid ? this.data.studentid : null;
    if (this.studentid == null) {
      this.WebinarRegistrationForm.patchValue({
        WebinarId: this.webinarId,
        studentid: this.studentid
      });
    } else {
      this.getStudent();
    }
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
      this.dialogRef.updateSize('40%', '84%');
    }
  }

  WebinarRegistrationForm: FormGroup = this.fb.group({ //Method Define Login
    studentid: [''],
    WebinarId: [''],
    Name: [''],
    MobileNumber: [''],
    email: ['']
  });

  ngOnInit(): void {
    // this.dialogRef.updateSize('50%','75%');
    this.logScreenSize();
  }

  getStudent() {
    this.loader = true;
    this.studentService.studentProfile('admin/getStudentData/' + this.studentid).subscribe((res: any) => {
      this.loader = false;
      if(res.ResponseCode == 800){
        this.WebinarRegistrationForm.patchValue({
          Name: res.data.StudentData.name,
          MobileNumber: res.data.StudentData.mobilenumber,
          email: res.data.StudentData.email,
          WebinarId: this.webinarId,
          studentid: this.studentid
        });
      }else if(res.ResponseCode == 300){
        console.log("No Data Found")
      }else{
        console.log("Serve Error")
      }
    
    })

  }

  RegisterInWebinar() {

    this.loader = true;

    this.webinarService.RegisterInWebinar('webinar/RegisterInWebinar', this.WebinarRegistrationForm.value).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        Swal.fire({ icon: 'success', text: "Registration Successfuly", timer: 3000 });
        this.dialogRef.close();
      } else if (res.ResponseCode == 302) {
        Swal.fire({ icon: 'error', text: 'Validation Error', timer: 3000 });
        this.dialogRef.close();
      } else if (res.ResponseCode == 801) {
        Swal.fire({ icon: 'error', text: 'You have already registered', timer: 3000 });
        this.dialogRef.close();
      } else {
        Swal.fire({ icon: 'error', text: 'something went wrong', timer: 3000 });
        this.dialogRef.close();
      }
    })
  }

}
