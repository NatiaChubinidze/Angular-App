import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map,catchError } from 'rxjs/operators';

import { IToken, IUserInfo } from '../data/user-info.interface';
import {
  TOKEN_KEY,
  TOKEN_EXP_KEY,
  TOKEN_TTL,
  EXP_TIME,
} from '../data/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _baseURL = 'https://reqres.in';
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  googleAuth:boolean;
  constructor(private http: HttpClient) {}

  getToken(inputData): Observable<boolean> {
    const data = JSON.stringify(inputData);
    return this.http
      .post<IToken>(`${this._baseURL}/api/login`, data, this.options)
      .pipe(
        tap((data) => {
          localStorage.setItem(TOKEN_KEY, data.token);
          this.setTokenValidTime();
        }),catchError(this.handleError),
        map((data) => {
          if (data.token) {
            return true;
          } else {
            return false;
          }
        })
      );
    
  }

  setTokenValidTime():void{
    const date = new Date();
    date.setMinutes(new Date().getMinutes()+TOKEN_TTL);
    localStorage.setItem(TOKEN_EXP_KEY,date.toJSON());
  }

  tokenIsValid():boolean{
    const timeNow = new Date().getTime();
    const tokenValidTill=new Date(localStorage.getItem(TOKEN_EXP_KEY)).getTime();
    return timeNow < tokenValidTill;
  }
  
  authIsSecure():boolean{
    const timeNow=new Date().getTime();
    const tokenValidTill=new Date(localStorage.getItem(TOKEN_EXP_KEY)).getTime();
    return tokenValidTill - timeNow > 3000;
    }

  signOut():void{
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
  }

  isSignedIn():boolean{
    if(localStorage.getItem(TOKEN_KEY)){
      return true;
    } else return false;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
