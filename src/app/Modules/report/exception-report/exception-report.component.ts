import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-exception-report',
  templateUrl: './exception-report.component.html',
  styleUrls: ['./exception-report.component.css']
})
export class ExceptionReportComponent {
  loader: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getExceptionDetails();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'createdate', 'userid', 'quizid', 'apppage','exceptionname', 'exceptiondetails'];


  getExceptionDetails() {
    this.loader = true;
    this.adminService.getFunction('admin/getExceptionDetails').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
            this.dataSource.paginator = this.paginator;
      }
    })
  }

}
