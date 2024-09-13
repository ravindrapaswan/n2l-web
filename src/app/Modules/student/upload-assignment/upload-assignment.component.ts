import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ShareService } from 'src/app/Services/share.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDialogComponent } from '../../admin/assignment-dialog/assignment-dialog.component';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css']
})
export class UploadAssignmentComponent {

  @ViewChild('AssigFile') AssigFile!: ElementRef;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  loader: boolean = false;
  StudentId: number = 0;
  constructor(
    private fb: FormBuilder,
    private shareService: ShareService,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {
    this.StudentId = this.shareService.currentUser.userid;
  }


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'coursename', 'uploaddate', 'assignmenttype', 'typedescription', 'filetype', 'view'];

  ngOnInit() {
    this.getCourse();
    this.getAssignments();
  }

  AssignmentForm: FormGroup = this.fb.group({ //Register Method
    AssignmentTypeId: ['', Validators.required],
    CourseId: ['', Validators.required],
    StudentId: [''],
    Points: ['']
  })

  AssignmentFile: any;
  selectPhoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.AssignmentFile = file;
    }
  }

  resetCompleteForm() {
    this.AssigFile.nativeElement.value = '';
    this.formDirective.resetForm();
  }

  course: any[] = [];
  selectedCourseId: number = 0;

  getCourse() {
    this.loader = true;
    this.studentService.getData('student/course/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        if (res.data.length == 1) { //for Auto fill if Only One row
          this.course = res.data;
          this.selectedCourseId = this.course[0].courseid;
          this.onCourseChange(this.selectedCourseId);
        } else {
          this.course = res.data;
        }
      } else {
        console.log(res)
      }
    });
  }

  Assignments: any[] = [];
  selectedassignmentTypeId: number = 0;
  onCourseChange(courseid: number) {
    if (courseid) {
      this.studentService.getData('student/assignmenttype/' + courseid).subscribe((res: any) => {
        if (res.status == 800) {
          if (res.data.length == 1) {
            this.Assignments = res.data;
            this.selectedassignmentTypeId = this.Assignments[0].assignmenttypeid;
            this.onAssignmentChange(this.selectedassignmentTypeId);
          } else {
            this.Assignments = res.data;
          }
        } else {
          // console.log(res)
        }
      })
    } else {
      this.Assignments = []; // Clear dependent options if no course is selected
    }
  }

  points: number = 0;
  fileType: string = '';
  filetTypeName: string = '';
  onAssignmentChange(assignmenttypeid: number) {
    this.filetTypeName = this.Assignments.find(a => a.assignmenttypeid === assignmenttypeid)?.filetype;
    this.points = this.Assignments.find(a => a.assignmenttypeid === assignmenttypeid)?.points;

    if (this.filetTypeName == 'video') {
      this.fileType = 'video/*';
    } else if (this.filetTypeName == 'audio') {
      this.fileType = 'audio/*';
    } else if (this.filetTypeName == 'pdf') {
      this.fileType = '.pdf';
    }
  }

  uploadAssignment() {
    this.loader = true;
    const formData = new FormData();
    formData.append('assignmentFile', this.AssignmentFile);

    this.AssignmentForm.patchValue({
      StudentId: this.StudentId,
      Points: this.points
    });

    if (!this.AssignmentFile) {
      Swal.fire({ icon: 'error', text: 'Please select a file', timer: 3000 });
      this.loader = false;
      return;
    }

    if (!this.AssignmentForm.valid) {
      Swal.fire({ icon: 'error', text: 'All Fields required', timer: 3000 });
      this.loader = false;
      return;
    }

    this.studentService.UploadAssignment('student/uploadAssignments', formData, this.AssignmentForm.value).subscribe((res: any) => {
      this.loader = false;
      if (res.status == 800) {
        Swal.fire({ icon: 'success', text: "Sumited Successfuly", timer: 3000 });
        // this.AssignmentForm.reset();
        this.resetCompleteForm();
        this.getAssignments();
      } else if (res.status == 302) {
        Swal.fire({ icon: 'error', text: 'Validation Error', timer: 3000 })
      }
      else {
        Swal.fire({ icon: 'error', text: 'Something Went Wrong', timer: 3000 })
      }
    })


  }

  getAssignments() {
    this.loader = true;
    this.studentService.getAssignment('student/getAssignment/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      } else {

      }

    })
  }

  viewFile(url: string, path: string, filetype: string) {

    if (filetype == 'video/mp4' || filetype == 'audio/mpeg') {
      const fileURL = url + path;
      window.open(fileURL);
    } else {
      const dialogData = { fileUrl: url, filePath: path, fileType: filetype };
      const dialogRef = this.dialog.open(AssignmentDialogComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe(result => {
      });

    }
  }

}
