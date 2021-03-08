import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IPosts } from './user';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private _baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPosts[]> {
    return this.http
      .get<IPosts[]>(`${this._baseURL}/posts`)
      .pipe(tap((data) => {}, catchError(this.handleError)));
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
