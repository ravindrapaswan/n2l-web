import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-active-inactive-students',
  templateUrl: './active-inactive-students.component.html',
  styleUrls: ['./active-inactive-students.component.css']
})
export class ActiveInactiveStudentsComponent implements AfterViewInit {

  loader: boolean = false;

  constructor(private adminService: AdminService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<any>([]);
  dataSourceDuplicate = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['sno', 'userid', 'name', 'mobilenumber', 'date_of_registration', 'DateOfLastActive'];

  totalStudents: number = 0;
  totalActiveStudents: number = 0;
  totalInactiveStudents: number = 0;

  showTable = false;    // Initially hide the table
  showReport(): void {  // Method to show the table when the button is clicked
    this.showTable = !this.showTable;
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  calculateStudentCounts() {
    this.totalStudents = this.dataSource.data.length;
    this.totalActiveStudents = this.dataSource.data.filter((student: any) => student.DateOfLastActive !== 'Inactive').length;
    this.totalInactiveStudents = this.dataSource.data.filter((student: any) => student.DateOfLastActive === 'Inactive').length;
    console.log("Total Students: ", this.totalStudents);
    console.log("Total Active Students: ", this.totalActiveStudents);
    console.log("Total Inactive Students: ", this.totalInactiveStudents);
  }

  // Get Students List
  getData() {
    this.loader = true;
    this.adminService.getFunction('admin/LastActiveDate').subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode === 800) {
        this.dataSource.data = res.data;
        this.dataSourceDuplicate.data = res.data;
        console.log("this.dataSource ",this.dataSource.data);
        this.calculateStudentCounts();
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    }, error => {
      this.loader = false;
      console.error('Error fetching data', error);
    });
  }

  // Apply filter to the dataSource by ravindra
  // filterStudents(searchTerm: any) {
  //   const searchValue = searchTerm.value ? searchTerm.value.trim().toLowerCase() : '';

  //   if (searchValue) {
  //     this.dataSource.data = this.dataSourceDuplicate.data.filter((student: any) =>
  //       student.name.toLowerCase().includes(searchValue) ||
  //       student.mobilenumber.toString().includes(searchValue) ||
  //       student.userid.toString().includes(searchValue)
  //     );
  //   } else {
  //     this.dataSource.data = [...this.dataSourceDuplicate.data];
  //   }
  // }
  filterStudents(searchTerm: any) {
    const searchValue = searchTerm.value ? searchTerm.value.trim().toLowerCase() : '';

    if (searchValue) {
      this.dataSource.data = this.dataSourceDuplicate.data.filter((student: any) => {
        const isMatch =
          student.name.toLowerCase().includes(searchValue) ||
          student.mobilenumber.toString().includes(searchValue) ||
          student.userid.toString().includes(searchValue) ||
          student.date_of_registration.toLowerCase().includes(searchValue);

        // Check for active or inactive status
        if (searchValue === 'active') {
          return isMatch || student.DateOfLastActive !== 'Inactive';
        } else if (searchValue === 'inactive') {
          return isMatch || student.DateOfLastActive === 'Inactive';
        } else {
          return isMatch;
        }
      });
    } else {
      this.dataSource.data = [...this.dataSourceDuplicate.data];
    }
  }

}
