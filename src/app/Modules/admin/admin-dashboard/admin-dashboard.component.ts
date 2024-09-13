import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  IsStudentPractices:boolean = false;

  loader: boolean = false;
  TotalNoOfPracticesThroughApp: number = 0;
  TotalNoOfPracticesThroughZoom: number = 0;
  Total_Number_of_Exceptions: number = 0;
  Total_Number_of_Practices: number = 0;
  Total_Number_of_User_Registration: number = 0;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.getData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'studentid', 'name', 'mobilenumber', 'No_of_Practices'];

  // get Students List
  getData() {
    this.loader = true;
    this.adminService.getFunction('admin/SummryReport').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.Total_Number_of_Practices = res.data.Total_Number_of_Practices;
        this.Total_Number_of_User_Registration = res.data.Total_Number_of_User_Registration;
        this.Total_Number_of_Exceptions = res.data.Total_Number_of_Exceptions;
      }
    })
  }

  getExceptionDetails() {
    this.loader = true;
    this.adminService.getFunction('admin/getExceptionDetails').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        console.log(res.data);
      }
    })
  }

  getRegistrationDetails() {
    console.log("clicked")
  }

  getPracticeDetails() {
    // this.IsStudentPractices = true;
    
    // this.loader = true;
    // this.adminService.getFunction('admin/noOfPractices').subscribe((res: any) => {
    //   this.loader = false;
    //   if (res.ResponseCode == 800) {
    //     this.dataSource = new MatTableDataSource(res.data);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // })
  }

}
