import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/Services/admin.service';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-on-date-student-wise-no-of-practices',
  templateUrl: './on-date-student-wise-no-of-practices.component.html',
  styleUrls: ['./on-date-student-wise-no-of-practices.component.css']
})
export class OnDateStudentWiseNoOfPracticesComponent {

  loader: boolean = false;
  Studentwise: boolean = true;

  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'coursename', 'batchname', 'studentid', 'name', 'mobilenumber', 'email','Total_no_of_Practices', 'No_of_Practices_On_Date', 'practiceDate' ];


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    // Set default date to current date minus one day
    const today = new Date();
    this.selectedDate = new Date(today.setDate(today.getDate() - 1));
    this.getData(this.selectedDate);
  }
  constructor(private adminService: AdminService) {
    this.getCourse();
    this.getBatch();
  }

  selectedDate!: Date;
  passedDate:any;

  StudentDataSource: any = [];
  StudentPractices: string[] = ['sno', 'studentid', 'date', 'quizid', 'quiztopicname', 'videopath'];

  MainS3BuckectURl: string = '';
  StudentName: string = '';
  StudentId: number = 0;


  // *************************************************************************************
  showTable = false; // Initially hide the table
  hideBtn: boolean = false;
  showBtn: boolean = true;

  selectedCourseId: any;
  courseList: any[] = [];

  batchList: any = [];
  selectedBatchId: any;


  // New with Pass Parameter Date
  getData(date: Date): void {
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-IN');
    this.passedDate = formattedDate;
    this.loader = true;
    this.adminService.postFunction('admin/noOfPracticesByDate', { Date: formattedDate }).subscribe((res: any) => {
        this.loader = false;
        if (res.ResponseCode === 800) {
            this.dataSource = new MatTableDataSource(res.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; // Apply sorting immediately
        } else {
            this.dataSource = null;
        }
    });
}


   // Method to show the table when the button is clicked
   showReport(): void {
    this.showTable = true;
    this.hideBtn = true;
    this.showBtn = false;
    if (this.showTable) {
        // Load the data only when 'Show Report' is clicked
        this.getData(this.selectedDate);
        this.applyFilter(); // Reapply the filter after data is loaded
    }
}
  hideReport(){
    this.showBtn = true;
    this.hideBtn = false;
    this.showTable = false;
  }

  applyFilter(): void {
    if (this.selectedCourseId || this.selectedBatchId) {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const filterObj = JSON.parse(filter);
            const matchesCourse = !filterObj.courseid || data.courseid === filterObj.courseid;
            const matchesBatch = !filterObj.batchid || data.batchid === filterObj.batchid;
            return matchesCourse && matchesBatch;
        };
        this.dataSource.filter = JSON.stringify({ courseid: this.selectedCourseId, batchid: this.selectedBatchId });
    } else {
        this.dataSource.filter = ''; // Reset filter if no selection
    }
}

  onCourseChange(courseid: any): void {
    this.selectedCourseId = courseid;
    this.hideBtn = false;
    this.showBtn = true;
  }
  onBatchChange(batchid: any): void {
    this.selectedBatchId = batchid;
    this.hideBtn = false;
    this.showBtn = true;
  }
  onDateChange(event: any): void {
    this.selectedDate = event.value;
    // this.getData(newDate);
    this.hideBtn = false;
    this.showBtn = true;
  }

// **************************************************************************************

  getPracticeDataByStudentId(studentid: number) { // Not USing
    this.Studentwise = false;
    this.loader = true;
    this.adminService.getFunction('admin/getPracticeDatabyStudentId/' + studentid).subscribe((res: any) => {
      // console.log(res);
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.StudentName = res.data[0].name;
        this.StudentId = res.data[0].studentid;
        this.MainS3BuckectURl = res.MainUrl;
        this.StudentDataSource = new MatTableDataSource(res.data);
        this.StudentDataSource.paginator = this.paginator;
        this.StudentDataSource.sort = this.sort;
      }
    })
  }

  //getPracticeDataByStudentIdAndDate
  getPracticeDataByStudentIdAndDate(studentid: number) {
    let body = {
      studentid:studentid,
      Date:this.passedDate
    }
    // console.log(body)
    this.Studentwise = false;
    this.loader = true;
    this.adminService.postFunction('admin/getPracticeDatabyStudentIdAndDate',body).subscribe((res: any) => {
      // console.log(res);
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.StudentName = res.data[0].name;
        this.StudentId = res.data[0].studentid;
        this.MainS3BuckectURl = res.MainUrl;
        this.StudentDataSource = new MatTableDataSource(res.data);
        this.StudentDataSource.paginator = this.paginator;
        this.StudentDataSource.sort = this.sort;
      }
    })
  }

  backButton() {
    this.Studentwise = true;
  }

  downloadVideo(path: string) {
    window.open(this.MainS3BuckectURl + path);
  }


  // get Course

  getCourse() {
    this.adminService.getStudentFunction('admin/getCourse').subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        this.courseList = res.data
        this.selectedCourseId = res.data[0].courseid
      }
    })
  }

  // Get Batch

  getBatch() {
    this.adminService.getFunction('admin/getBatch').subscribe((res: any) => {
      if (res.ResponseCode == 800) {
        this.batchList = res.data
      } else {

      }
    })
  }

  // --------------------------------


  // Export to excel
  exportToExcel(): void {
    // Example data source, replace with your actual data source
    const dataSource = this.dataSource.filteredData.length ? this.dataSource.filteredData : this.dataSource.data;

    // Define the columns you want to export
    const selectedColumns = ['coursename', 'batchname', 'studentid', 'name', 'mobilenumber', 'email', 'No_of_Practices']; // Replace with your actual column names

    // Filter the data to include only the selected columns
    const filteredData = dataSource.map((row: any) => {
      const filteredRow: any = {};
      selectedColumns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    // Convert the filtered data to a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Create a new workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    // Export the workbook to an Excel buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'No. of practices Studentwise');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx'; //new Date().getDate()
    link.click();
    window.URL.revokeObjectURL(url);
  }


  // CSV
  exportToCsv(): void {
    const dataSource = this.dataSource.filteredData.length ? this.dataSource.filteredData : this.dataSource.data;

    // Define the columns you want to export
    const selectedColumns = ['sno', 'coursename', 'batchname', 'studentid', 'name', 'mobilenumber', 'email','Total_no_of_Practices', 'No_of_Practices_On_Date', 'practiceDate' ]; // Replace with your actual column names


    const datePipe = new DatePipe('en-IN'); // Adjust the locale as needed
    // Filter the data to include only the selected columns
    const filteredData = dataSource.map((row: any) => {
      const filteredRow: any = {};
      selectedColumns.forEach(column => {
         if (column === 'practiceDate') {
        // Format the practiceDate column using DatePipe
        filteredRow[column] = datePipe.transform(row[column], 'dd-MM-yyyy');
      } else {
        filteredRow[column] = row[column];
      }
      });
      return filteredRow;
    });

    // Convert the filtered data to a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Convert the worksheet to CSV
    const csv: string = XLSX.utils.sheet_to_csv(worksheet);

    // Create a Blob from the CSV data
    const blob: Blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PracticesByDate.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

}
