import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _HttpClient:HttpClient) { }
  signup(registerData:any):Observable<any>{
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signup',registerData)
  }
  signin(loginData:any):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signin',loginData)
  }
}
