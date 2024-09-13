import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareService } from 'src/app/Services/share.service';
import { StudentService } from 'src/app/Services/student.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditViewComponent } from '../edit-view/edit-view.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {

  loader: boolean = false;
  StudentId: number = 0;
  UserName: string = '';
  ProfilePhoto: string = '';
  isProfilePhoto: boolean = false;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {
    this.StudentId = this.shareService.currentUser.userid;
  }

  ngOnInit() {
    this.UserName = this.shareService.currentUser.name;
    this.getStudent();
  }

  name: string = '';
  email: string = '';
  gender: string = '';
  mobilenumber: number = 0;
  dob: string = '';

  fileUrl: string = '';
  getStudent() {
    this.loader = true;
    this.studentService.studentProfile('admin/getStudentData/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.name = res.data.StudentData.name;
        this.dob = res.data.StudentData.dob;
        this.gender = res.data.StudentData.gender;
        this.mobilenumber = res.data.StudentData.mobilenumber;
        this.email = res.data.StudentData.email;
        if (res.data.StudentData.photo !== null) {
          this.ProfilePhoto = res.data.url + res.data.StudentData.photo;
        }
      }

      if (this.ProfilePhoto.length > 3) {
        this.isProfilePhoto = true;
      } else {
        this.isProfilePhoto = false;
      }
    })
  }

  edit() {
    const dialogRef = this.dialog.open(EditViewComponent, { data: this.StudentId });
    dialogRef.afterClosed().subscribe(result => {
      this.getStudent();
    });
  }
}
