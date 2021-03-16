  
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {HttpCacheService} from '../core/http-cache.service';

@Injectable({
    providedIn:'root'
})

export class HttpCacheInterceptorService implements HttpInterceptor{
    constructor(private _cacheService:HttpCacheService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method!=="GET"){
            return next.handle(req);
        }
        const cachedResponse:HttpResponse<any> |undefined=this._cacheService.get(req.url);

        if(cachedResponse){
            return of(cachedResponse);
        }
        return next.handle(req).pipe(tap((event)=>{
            if(event instanceof HttpResponse){
                this._cacheService.put(req.url,event);
            }
        }))
    }

}