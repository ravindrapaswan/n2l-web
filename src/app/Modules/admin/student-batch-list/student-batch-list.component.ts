import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-student-batch-list',
  templateUrl: './student-batch-list.component.html',
  styleUrls: ['./student-batch-list.component.css']
})
export class StudentBatchListComponent {

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
  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'name', 'mobilenumber', 'photo'];

  constructor(private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) {
      this.getBatchbyBatchid(this.data.batchid);
  }

  s3Url:string='';
  userPhoto='assets/images/user_ico2.jpg';
  // Batch by batchid 
  getBatchbyBatchid(batchid:number) {
    this.adminService.getFunction('admin/getBatch/' + batchid).subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.s3Url = res.MainUrl;
      } else {

      }
    })
  }

}
