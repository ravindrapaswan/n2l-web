import { Component } from '@angular/core';

@Component({
  selector: 'app-points-detail',
  templateUrl: './points-detail.component.html',
  styleUrls: ['./points-detail.component.css']
})
export class PointsDetailComponent {
  loader: boolean = false;

  pointSwitch:number = 1; //1 for Earned Points, 2 for Spent Points
  
  
}
