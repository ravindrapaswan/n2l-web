import { Component, ViewChild } from '@angular/core';
import { ShareService } from 'src/app/Services/share.service';
import { StudentService } from 'src/app/Services/student.service';
import { Router } from '@angular/router';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  loader: boolean = false;
  StudentId: any;
  constructor(private studentService: StudentService,
    private shareService: ShareService,
    private router: Router,
    public dialog: MatDialog
  ) {

    this.StudentId = this.shareService.currentUser.userid;
    this.getDashboardData()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any = [];
  displayedColumns: string[] = ['assignmenttype', 'assignedpoints', 'uploaddate', 'quiztopicname','view'];

  EarnedPonits: number = 0;
  SpentPoints: number = 0;

  // Get Dashboard Data
  getDashboardData() {
    this.loader = true;
    this.studentService.getData('student/getPoints/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.EarnedPonits = res.data[0].assignedpoints;
      } else {
        this.EarnedPonits = 0;
      }
    })
  }

  pointSwitch: number = 0; //1 for Earned Points, 2 for Spent Points
  SwitchToPointsDetail(id: number) {
    // this.router.navigate(['/student/pointsDetail'])
    this.pointSwitch = id;

    if(this.pointSwitch==1){
      this.getEarnedPoints();
    }else{

    }
  }

  MainUrl:string='';

  viewFile(path: string, filetype: string) {
    window.open(this.MainUrl + path);
  }

  getEarnedPoints() {
    this.loader = true;
    this.studentService.getData('student/getPointDetails/' + this.StudentId).subscribe((res: any) => {
      this.loader = false;
      if (res.ResponseCode == 800) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.MainUrl = res.MainUrl.url;
      } else {
      }
    })
  }


}
