import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  isLoginSubject = new BehaviorSubject<boolean>(false);

  isLogin$ = this.isLoginSubject.asObservable();

  constructor(private router: Router, private helper: JwtHelperService) {
    // Check for the token in local storage when the service is created
    this.checkToken();
  }

  get currentUser() {
    const token = localStorage.getItem('token')
    if (token) {
      if (!this.helper.isTokenExpired(token)) {
        return this.helper.decodeToken(token)
      } else {
        this.logout()
      }
    }
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token; // Check if token exists
    this.isLoginSubject.next(isLoggedIn);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false       
    }
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoginSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this.router.navigate(['/home'])
  }

}
