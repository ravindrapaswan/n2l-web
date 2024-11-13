import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StudentAssignmentListComponent } from '../student-assignment-list/student-assignment-list.component';





@Component({
    selector: 'app-batchwise-assignment',
    templateUrl: './batchwise-assignment.component.html',
    styleUrls: ['./batchwise-assignment.component.css']
  })


export class BatchwiseAssignmentComponent{

  loader:boolean = false;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAssignments();
  }

  

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  

  uniqueCourseNames: string[] = [];
  selectedCourse: string | undefined; 

  uniqueBatchName: string[] = ["test"];
  selectedBatch: string | undefined;

  dataSource: any = [];
  displayedColumns: string[] = ['sno', 'studentName', 'totalAssignments', 'totalPoints', 'view'];



// **********************************************************************

MainUrl:string='';
  // Get assignments
  getAssignments() {
    this.loader =true;
    this.adminService.getAssignment('admin/getStudentAssignmentSummary').subscribe((res: any) => {

      console.log("res: ",res);

      this.loader = false;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    //   this.MainUrl = res.MainUrl;
      // For Filters
      this.uniqueCourseNames = Array.from(new Set(res.data.map((coursename: any) => coursename.courseName)));
      this.uniqueBatchName = Array.from(new Set(res.data.map((batchname: any) => batchname.batchName)));
    })
  }


  getAssignmentbyStudentid(studentid: number, studentName: String) {
    console.log("getAssignmentbyStudentid called: studentid => ",studentid)
    const dialogRef = this.dialog.open(StudentAssignmentListComponent, { data: { studentid, studentName } });

    console.log("dialogRef ",dialogRef)
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }






   // **********************************************************************
    // Table Filters
    hideBtn: boolean = false;
    showBtn: boolean = true;
    showTable = false;

   // Table Filters
    applyFilters(): void {
        console.log("Applying filters");

        // Combine all the filters into one string
        const filterValues = {
            course: this.selectedCourse || '',
            batch: this.selectedBatch || ''
        };

        // Update the filterPredicate
        this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
            const searchTerms = JSON.parse(filter);

            // Return true only if all filters match
            const courseMatch = data.courseName.toLowerCase().includes(searchTerms.course.trim().toLowerCase());
            const batchMatch = data.batchName.toLowerCase().includes(searchTerms.batch.trim().toLowerCase());

            // Combine all conditions (return true only if all conditions are met)
            return courseMatch && batchMatch;
        };

        // Set the combined filter string
        this.dataSource.filter = JSON.stringify(filterValues);
    }

    // Show report function
    showReport(): void {
      console.log("showReport called")
      this.showTable = true;

      this.hideBtn = true;
      this.showBtn = false;
      if (this.showTable) {
          // Load the data and apply the combined filter when 'Show Report' is clicked
          this.applyFilters();
          setTimeout(() => this.dataSource.sort = this.sort, 0);
      }
    }

    // Hide report function
    hideReport() {
    this.showBtn = true;
    this.hideBtn = false;
    this.showTable = false;
    }

    // Show button with selection
    showBtnWuthSelection(): void {
      this.hideBtn = false;
      this.showBtn = true;
    }

}