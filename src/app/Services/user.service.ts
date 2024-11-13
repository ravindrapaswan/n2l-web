import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; //for environment URL
import { Observable, catchError, tap } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }

  loginFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  getOtpFunction(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  sendOtpFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  verifyOtpFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }
  
  registerFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  GenerateOtoFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  VerifyAndForgetPass(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  GenerateDataFunction(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  getDataFunction(path: string):Observable<object>{
    return this.http.get(environment.apiUrl + path).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }

  getDataFunction2(path: string, body: any):Observable<object>{
    return this.http.post(environment.apiUrl + path, body).pipe(tap(res => res), catchError(e=>{
      throw new Error(e);
    }))
  }


 

}
