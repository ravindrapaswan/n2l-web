import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewPhotoComponent } from '../view-photo/view-photo.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-record',
  templateUrl: './student-record.component.html',
  styleUrls: ['./student-record.component.css']
})
export class StudentRecordComponent {
  loader: boolean = false;
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStudents()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['userid', 'name', 'date_of_registration', 'mobilenumber', 'email', 'photo', 'edit', 'delete'];

  fileUrl: string = '';

  // get Students List
  getStudents() {
    this.loader = true;
    this.adminService.getStudentFunction('admin/getStudents').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.fileUrl = res.data[0].URL;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        console.log("this.dataSource ",this.dataSource.data);
      }
    })
  }

  // Open Dialog for View Photo
  viewPhoto(path: string) {
    let imagePath: string = '';

    if (path == null) {
      imagePath = '';
    } else {
      imagePath = this.fileUrl + path;
    }
    // const imagePath = this.fileUrl + path;
    const dialogRef = this.dialog.open(ViewPhotoComponent, { data: imagePath });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Edit Photo Method
  edit(userid: number) {
    const dialogRef = this.dialog.open(EditStudentComponent, { data: userid });
    dialogRef.afterClosed().subscribe(result => {
      this.getStudents();
    });
  }

  // Delete User Method
  deleteUser(userid: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        this.adminService.deleteStudent('users/deleteStudent/' + userid).subscribe((res: any) => {
          this.loader = false;
          if (res.ResponseCode == 800) {
            Swal.fire({
              title: "Deleted!",
              text: res.ResponseMsg,
              icon: "success"
            });
            this.getStudents();
          } else {
            Swal.fire({
              title: "Error!",
              text: res.ResponseMsg,
              icon: "error"
            });
          }
        })
      }
    });

  }

}
