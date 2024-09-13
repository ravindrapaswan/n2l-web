import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  loader: boolean = false;
  StudentId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private adminService: AdminService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {
    this.StudentId = this.data;
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

  //Dialog Change as per Screen Size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.logScreenSize();
  }
  // Screen Resizer
  logScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
    } else {
      this.dialogRef.updateSize('60%', '65%');
    }
  }

  selectedGenderId: number = 0;
  // Get and fill student data
  getStudent() {
    this.loader = true;

    this.adminService.getStudentFunction('admin/getStudentData/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;

      if (res.ResponseCode == 800) {

        let formattedDOB = '';
        if (res.data.StudentData.dob !== '0000-00-00') {
          formattedDOB = this.datePipe.transform(res.data.StudentData.dob, 'yyyy-MM-dd') || '';
        }

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

  Gender: any[] = [];
  getgender() {
    this.adminService.getAssignment('users/gender').subscribe((res: any) => {
      this.Gender = res.data
    })
  }

  // Update Profile Method
  updateStudent() {

    this.loader = true;
    const formData = new FormData();

    formData.append('ProfilePhoto', this.ProfilePhoto);

    const formattedDate = this.datePipe.transform(this.StudentUpdateForm.value.DOB, 'yyyy-MM-dd');

    this.StudentUpdateForm.patchValue({
      DOB: formattedDate
    })

    if (!this.StudentUpdateForm.valid) {
      this.loader = false;
      Swal.fire({ icon: 'error', text: 'Required All Fields', timer: 3000 })
      return;
    }

    this.adminService.UpdateStudentProfile('admin/updateProfile/' + this.StudentId, formData, this.StudentUpdateForm.value).subscribe((res: any) => {
      
      this.loader = false;
      console.log(res);
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
}
