import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IMember } from '../shared/data/member.interface';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<IMember> {
    return this.http
      .get<IMember>('https://reqres.in/api/users?page=1&per_page=12')
      .pipe(catchError(this.handleError));
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
