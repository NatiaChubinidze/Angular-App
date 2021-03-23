import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IArticle } from '../articles/article-interfaces';
import { IForm } from '../data/filter-form.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  public form: IForm = {
    qInTitle: 'twitter',
    pageSize: 20,
    page: 2,
    language: 'en',
  };
  private _BASE_URL: string = 'https://newsapi.org/v2';
  constructor(private http: HttpClient) {}
  createRequest(q: string): string {
    const request = `${this._BASE_URL}/everything?${q}`;
    return request;
  }

  getArticles(query: string): Observable<IArticle[]> {
    const request: string = this.createRequest(query);
    return this.http
      .get<IArticle[]>(request)
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getArticle(qInTitle: string, lang: string): Observable<IArticle[]> {
    return this.http
      .get<IArticle[]>(
        `${this._BASE_URL}/everything?qInTitle=${qInTitle}&language=${lang}`
      )
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
