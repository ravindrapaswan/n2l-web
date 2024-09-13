import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDialogComponent } from '../assignment-dialog/assignment-dialog.component';

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
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'coursename', 'uploaddate', 'assignmenttype', 'typedescription', 'filetype', 'view'];

  uniqueCourseNames: string[] = [];
  selectedCourse: string | undefined; 

  uniqueAssignmentNames: string[] = [];
  selectedAssignment: string | undefined; 

  uniqueName: string[] = [];
  selectedName: string | undefined; 

  MainUrl:string='';
  // Get assignments
  getAssignments() {
    this.loader =true;
    this.adminService.getAssignment('admin/getAssignment').subscribe((res: any) => {

      this.loader = false;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.MainUrl = res.MainUrl;
      // For Filters
      this.uniqueCourseNames = Array.from(new Set(res.data.map((assignment: any) => assignment.coursename)));
      this.uniqueAssignmentNames = Array.from(new Set(res.data.map((assignment: any) => assignment.assignmenttype)));
      this.uniqueName = Array.from(new Set(res.data.map((assignment: any) => assignment.name)));
    })
  }


  viewFile(path: string, filetype: string) {

    window.open(this.MainUrl+path);
    // const dialogData = { filePath: path, fileType: filetype, fileUrl: this.MainUrl };
    // const dialogRef = this.dialog.open(AssignmentDialogComponent, { data: dialogData });
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  // Table Filters
  applyCourseFilter(): void {
    this.dataSource.filter = `${this.selectedCourse || ''}`.trim().toLowerCase();
  }

  applyAssignmentFilter(): void {
    this.dataSource.filter = `${this.selectedAssignment || ''}`.trim().toLowerCase();
  }

  applyNameFilter(): void {
    this.dataSource.filter = `${this.selectedName || ''}`.trim().toLowerCase();
  }
  

}
