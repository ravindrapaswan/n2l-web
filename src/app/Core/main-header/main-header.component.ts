import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

constructor(private userService: UserService, private shareService: ShareService ){}


}
