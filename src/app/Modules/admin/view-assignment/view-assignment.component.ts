import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent { 

  loader:boolean = false;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAssignments();
  }



  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource: any = [];
  displayedColumns: string[] = ['name', 'coursename', 'uploaddate', 'assignmenttype', 'batch', 'view'];

  uniqueCourseNames: string[] = [];
  selectedCourse: string | undefined; 

  uniqueAssignmentNames: string[] = [];
  selectedAssignment: string | undefined; 

  uniqueName: string[] = [];
  selectedName: string | undefined;

  uniqueBatch: string[] = [];
  selectedBatch: string | undefined;

  MainUrl:string='';
  // Get assignments
  getAssignments() {
    this.loader =true;
    this.adminService.getAssignment('admin/getAssignment').subscribe((res: any) => {

      console.log("res: ",res);

      this.loader = false;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.MainUrl = res.MainUrl;
      // For Filters
      this.uniqueCourseNames = Array.from(new Set(res.data.map((assignment: any) => assignment.coursename)));
      this.uniqueAssignmentNames = Array.from(new Set(res.data.map((assignment: any) => assignment.assignmenttype)));
      this.uniqueName = Array.from(new Set(res.data.map((assignment: any) => assignment.name)));
      this.uniqueBatch = Array.from(new Set(res.data.map((batchname: any) => batchname.batchname)));
    })
  }


  viewFile(path: string, filetype: string) {

    window.open(this.MainUrl+path);
    // const dialogData = { filePath: path, fileType: filetype, fileUrl: this.MainUrl };
    // const dialogRef = this.dialog.open(AssignmentDialogComponent, { data: dialogData });
    // dialogRef.afterClosed().subscribe(result => {
    // });
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
      assignment: this.selectedAssignment || '',
      name: this.selectedName || '',
      batch: this.selectedBatch || ''
  };

  // Update the filterPredicate
  this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      // Return true only if all filters match
      const courseMatch = data.coursename.toLowerCase().includes(searchTerms.course.trim().toLowerCase());
      const assignmentMatch = data.assignmenttype.toLowerCase().includes(searchTerms.assignment.trim().toLowerCase());
      const nameMatch = data.name.toLowerCase().includes(searchTerms.name.trim().toLowerCase());
      const batchMatch = data.batchname.toLowerCase().includes(searchTerms.batch.trim().toLowerCase());

      // Combine all conditions (return true only if all conditions are met)
      return courseMatch && assignmentMatch && nameMatch && batchMatch;
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
