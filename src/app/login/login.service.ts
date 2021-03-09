import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IToken, IUserInfo } from '../data/user-info.interface';



@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _baseURL = 'https://reqres.in';
 options = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  constructor(private http: HttpClient) {}

  getToken(data): Observable<IToken> {
      const dataa=JSON.stringify(data);
    // return this.http
    //   .post<IToken>(`${this._baseURL}/api/login`,JSON.stringify(data),this.options)
    //   .pipe(tap((data) => {}, catchError(this.handleError)));
      return this.http.post<IToken>("https://reqres.in/api/login",dataa,this.options);
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
