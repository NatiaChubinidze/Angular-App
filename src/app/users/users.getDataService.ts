import { Injectable } from '@angular/core';
import { IPosts } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private _baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(`${this._baseURL}/posts`);
  }
}
