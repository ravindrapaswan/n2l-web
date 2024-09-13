import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from 'src/app/Services/student.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent {

  StudentId: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private studentService: StudentService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {
    this.StudentId = this.data;
  }

  loader: boolean = false;

  //Dialog Change as per Screen Size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.logScreenSize();
  }
  logScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
    } else {
      this.dialogRef.updateSize('60%', '65%');
    }
  }

  ngOnInit(): void {
    this.getStudent();
    this.getgender();
    this.logScreenSize();
  }

  StudentUpdateForm: FormGroup = this.fb.group({ //Register Method
    Name: ['', Validators.required],
    Gender: [''],
    DOB: [''],
    MobileNumber: ['', Validators.required],
    email: ['']
  })

  selectedGenderId: number = 0;
  getStudent() {
    this.loader = true;
    this.studentService.studentProfile('admin/getStudentData/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        const formattedDOB = this.datePipe.transform(res.data.StudentData.dob, 'yyyy-MM-dd');
        this.StudentUpdateForm.patchValue({
          Name: res.data.StudentData.name,
          Gender: res.data.StudentData.gender,
          DOB: formattedDOB,
          MobileNumber: res.data.StudentData.mobilenumber,
          email: res.data.StudentData.email
        });
        this.selectedGenderId = res.data.StudentData.genderid;
      }
    })
  }

  ProfilePhoto: any;
  selectPhoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProfilePhoto = file;
    }
  }

  updateStudent() {
    const formData = new FormData();
    formData.append('photo', this.ProfilePhoto);
    const formattedDate = this.datePipe.transform(this.StudentUpdateForm.value.DOB, 'yyyy-MM-dd');

    this.StudentUpdateForm.patchValue({
      DOB: formattedDate
    })

    if (!this.StudentUpdateForm.valid) {
      Swal.fire({ icon: 'error', text: 'Required All Fields', timer: 3000 })
      return;
    }

    this.studentService.UpdateProfile('admin/updateProfile/' + this.StudentId, formData, this.StudentUpdateForm.value).subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        Swal.fire({ icon: 'success', text: res.ResponseMsg, timer: 3000 });
      } else if (res.status == 302) {
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
      }
      else {
        Swal.fire({ icon: 'error', text: res.ResponseMsg, timer: 3000 })
      }
    })
  }

  Gender: any[] = [];
  getgender() {
    this.studentService.getData('users/gender').subscribe((res: any) => {
      if(res.ResponseCode == 800){
        this.Gender = res.data;
      }
      
    })
  }
}
