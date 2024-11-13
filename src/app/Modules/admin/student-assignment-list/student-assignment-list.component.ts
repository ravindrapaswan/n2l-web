import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Services/admin.service';

import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student-assignment-list',
  templateUrl: './student-assignment-list.component.html',
  styleUrls: ['./student-assignment-list.component.css']
})
export class StudentAssignmentListComponent {

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
        this.dialogRef.updateSize('60%', '70%');
      }
    }
  
    ngOnInit(): void {
      // this.dialogRef.updateSize('50%','75%');
      this.logScreenSize();
    }


    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'assignmentType', 'uploadDate', 'points', 'download'];
  selectedStudentName: String = "";

  constructor(private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) {
      this.getAsignmentByStudentId(this.data.studentid, this.data.studentName);
  }

  MainUrl:string='';
  userPhoto='assets/images/user_ico2.jpg';
  // Batch by batchid 
  getAsignmentByStudentId(studentid:number, studentName: String) {


    this.selectedStudentName = studentName;



    console.log("getAsignmentByStudentId called from student-assignment-list: studentid ",studentid)
    console.log("getAsignmentByStudentId called from student-assignment-list: studentName ",studentName)

    this.adminService.postFunction2('admin/getStudentAssignments', {studentid}).subscribe((res: any) => {

      console.log("getStudentAssignments resssss: ",res);
      if (res.ResponseCode == 800) {
        this.MainUrl = res.MainUrl;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;

        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 0);

      } else {

      }
    })
  }


  downloadFile(path: string){
    window.open(this.MainUrl+path);
  }



}
