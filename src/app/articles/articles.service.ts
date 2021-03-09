import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IArticle } from '../articles/article-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private _BASE_URL: string = 'https://newsapi.org/v2';
  private _API_KEY: string = 'e54acbd7dc5445dd90f48dd1e0b3b2e9';
  constructor(private http: HttpClient) {}
  createRequest(
    q: string
  ): string {
    const request = `${this._BASE_URL}/everything?${q}&apiKey=${this._API_KEY}`;
    return request;
  }
  
  getArticles(
    query: string
  ): Observable<IArticle[]> {
    const request: string = this.createRequest(query);
    return this.http.get<IArticle[]>(request).pipe(tap((data)=>{},catchError(this.handleError)));
  }


  
  getArticle(
    qInTitle: string,
    lang:string
  ): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this._BASE_URL}/everything?qInTitle=${qInTitle}&language=${lang}&apiKey=${this._API_KEY}`).pipe(tap((data)=>{},catchError(this.handleError)));
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
