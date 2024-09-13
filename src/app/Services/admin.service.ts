import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; //for environment URL
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,) { }

  ExcelFunction(path: string, body: any): Observable<object> {
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getStudentFunction(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getBatchStudents(path: string): Observable<object> {
    return this.http.post(environment.apiUrl + path, {}).pipe(
      tap(res => res),
      catchError(e => {
        console.error('API call error:', e);
        return throwError(() => new Error('Failed to fetch data from API.'));
      })
    );
  }

  UpdateStudentProfile(path: string, formData: FormData, formValue: any): Observable<object> {
    // Append additional form data fields to the FormData object
    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });

    return this.http.post(environment.apiUrl + path, formData, formValue).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getAssignment(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getWebinar(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getWebinarById(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  deleteStudent(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  bulkAudio(path: string, body: any): Observable<object> {
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  UploadZoomFile(path: string, formData: FormData, formValue: any): Observable<object> {
    // Append additional form data fields to the FormData object
    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });

    return this.http.post(environment.apiUrl + path, formData, formValue).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getS3Data(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  postFunction(path: string, body: any): Observable<object> {
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  getFunction(path: string): Observable<object> {
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

}
