import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleHeaderInterceptorService implements HttpInterceptor {
  private _API_KEY: string = 'e54acbd7dc5445dd90f48dd1e0b3b2e9';
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: this._API_KEY,
      },
    });
    return next.handle(clonedRequest);
  }
}
