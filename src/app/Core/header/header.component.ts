import { Component } from '@angular/core';
import { ShareService } from 'src/app/Services/share.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private shareService: ShareService,
    private studentService: StudentService,
  ) { }

  UserName: string = '';
  ProfilePhoto: string = '';
  isProfilePhoto: boolean = false;
  role:string='';

  ngOnInit() {
    this.getProfile();
  }

  // Get Profile for Header bar
  getProfile() {
    this.studentService.studentProfile('users/getProfile/' + this.shareService.currentUser.userid).subscribe((res: any) => {
     
      if (res.ResponseCode == 800) {
        this.UserName = res.data.name;
        this.ProfilePhoto = res.data.url + res.data.photo;
        this.role =  res.data.role;
        if (res.data.photo == null) {
          this.isProfilePhoto = false;
        } else {
          this.isProfilePhoto = true;
        }
      } else {

      }
    })
  }

  Logout() {
    this.shareService.logout();
  }

}
