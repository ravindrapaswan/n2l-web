import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})

export class ViewAssignmentComponent { 

  loader = false;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'coursename', 'uploaddate', 'assignmenttype', 'batch', 'view'];

  uniqueCourseNames: string[] = [];
  selectedCourse: string | undefined; 

  uniqueAssignmentNames: string[] = [];
  selectedAssignment: string | undefined; 

  uniqueName: string[] = [];
  selectedName: string | undefined;

  filteredNames: string[] = [...this.uniqueName]; 

  uniqueBatch: string[] = [];
  selectedBatch: string | undefined;

  MainUrl = '';
  showTable = false;
  hideBtn = false;
  showBtn = true;

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

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
  


  // Get assignments
  async getAssignments() {
    this.loader = true;
    this.adminService.getAssignment('admin/getAssignment').subscribe((res: any) => {
      this.loader = false;
      this.dataSource = new MatTableDataSource(
        res.data.filter((item: any) => item.isdeleted === 0)
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
      this.MainUrl = res.MainUrl;


      this.uniqueCourseNames = Array.from(
        new Set(res.data.map((assignment: any) => assignment.coursename as string))
      ) as string[];
      this.uniqueCourseNames.sort((a, b) => a.localeCompare(b));

      this.uniqueAssignmentNames = Array.from(
        new Set(res.data.map((assignment: any) => assignment.assignmenttype as string))
      ) as string[];
      this.uniqueAssignmentNames.sort((a, b) => a.localeCompare(b));
      
      // this.uniqueName = Array.from(new Set(res.data.map((assignment: any) => assignment.name)));
      this.uniqueName = Array.from(
        new Set(res.data.map((assignment: any) => assignment.name as string))
      ) as string[];
      this.uniqueName.sort((a, b) => a.localeCompare(b));


      this.filteredNames = [...this.uniqueName];  // Initialize filteredNames here
      console.log("filteredNames ",this.filteredNames);
      
      this.uniqueBatch = Array.from(
        new Set(
          res.data
            .filter((item: any) => item.isdeleted === 0)
            .map((batchname: any) => batchname.batchname) as string
        )
      ) as string[];
      this.uniqueBatch.sort((a, b) => a.localeCompare(b));

    });


  }

  batchwiseFilterStudent() {
    console.log("selectedBatch ", this.selectedBatch);
    console.log("dataSource ", this.dataSource);

    if (this.selectedBatch) {
      // Filter the data based on the selected batch
      this.filteredNames = Array.from(
        new Set(
          this.dataSource.data
            .filter((assignment: any) => assignment.batchname === this.selectedBatch) // Filter based on batchname
            .map((assignment: any) => assignment.name) // Extract the name
        )
      ) as string[]; // Ensure it's treated as an array of strings

      // Sort the filtered names alphabetically
      this.filteredNames.sort((a, b) => a.localeCompare(b));

      console.log("filteredNames: ", this.filteredNames);

    } else {
      // If no batch is selected, show all names from uniqueName
      this.filteredNames = [...this.uniqueName];
      console.log("filteredNames: ", this.filteredNames);
    }
}


  viewFile(path: string, filetype: string) {
    window.open(this.MainUrl + path);
  }

  applyFilters(): void {
    const filterValues = {
      course: this.selectedCourse || '',
      assignment: this.selectedAssignment || '',
      name: this.selectedName || '',
      batch: this.selectedBatch || ''
    };

    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const courseMatch = data.coursename.toLowerCase().includes(searchTerms.course.trim().toLowerCase());
      const assignmentMatch = data.assignmenttype.toLowerCase().includes(searchTerms.assignment.trim().toLowerCase());
      const nameMatch = data.name.toLowerCase().includes(searchTerms.name.trim().toLowerCase());
      const batchMatch = data.batchname.toLowerCase().includes(searchTerms.batch.trim().toLowerCase());

      return courseMatch && assignmentMatch && nameMatch && batchMatch;
    };

    this.dataSource.filter = JSON.stringify(filterValues);
  }

  showReport(): void {
    this.showTable = true;
    this.hideBtn = true;
    this.showBtn = false;
    if (this.showTable) {
      this.applyFilters();

      setTimeout(() => this.dataSource.sort = this.sort, 0);
    }

  }

  hideReport(): void {
    this.showBtn = true;
    this.hideBtn = false;
    this.showTable = false;
  }

  showBtnWuthSelection(): void {
    this.hideBtn = false;
    this.showBtn = true;

    this.batchwiseFilterStudent()
  }

  filterStudents(searchTerm: any): void {
    console.log("filteredNames ", this.filteredNames)
    const searchValue = searchTerm.value ? searchTerm.value.trim().toLowerCase() : '';
  
    if (searchValue) {
      this.filteredNames = this.uniqueName.filter((student: string) =>
        student.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredNames = [...this.uniqueName];
    }
  }

 

  
}
