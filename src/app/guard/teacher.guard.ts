import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from '../Services/share.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private shareService: ShareService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.shareService.isLoggedIn()) {
      if (this.shareService.currentUser.teacher_student == '2') {
        return true
      } else {
        this.router.navigate(['login'])
        return false
      }
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
