import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; //for environment URL
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getWebinar(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  studentProfile(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  UpdateProfile(path: string, formData: FormData, formValue: any): Observable<object> {
    // Append additional form data fields to the FormData object
    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });
    return this.http.post(environment.apiUrl + path, formData, formValue).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  UploadAssignment(path: string, formData: FormData, formValue: any): Observable<object> {
    // Append additional form data fields to the FormData object
    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });

    return this.http.post(environment.apiUrl + path, formData, formValue).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getData(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  getAssignment(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  feedback(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }
}
