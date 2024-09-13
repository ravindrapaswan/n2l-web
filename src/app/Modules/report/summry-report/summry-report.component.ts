import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-summry-report',
  templateUrl: './summry-report.component.html',
  styleUrls: ['./summry-report.component.css']
})
export class SummryReportComponent {

  loader: boolean = false;
  TotalNoOfPracticesThroughApp:number=0;
  TotalNoOfPracticesThroughZoom:number=0;
  Total_Number_of_Exceptions:number=0;
  Total_Number_of_Practices:number=0;
  Total_Number_of_User_Registration:number=0;

  constructor(private adminService: AdminService,private fb: FormBuilder) {
    this.getData();
  }

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
}
