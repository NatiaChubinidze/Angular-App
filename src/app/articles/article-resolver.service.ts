import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { IArticle } from './article-interfaces';
import { ArticlesService } from './articles.service';
import { IForm } from '../data/filter-form.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolverService implements Resolve<IArticle[]> {
  constructor(private _articleService: ArticlesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IArticle[]> {
    const qInTitle:any=route.queryParamMap.get("qInTitle") || "facebook";
    const pageSize:any=route.queryParamMap.get("pageSize") || 20;
    const page:any=route.queryParamMap.get("page") || 1;
    const sortBy:any=route.queryParamMap.get("sortBy") || null;
    const language:any=route.queryParamMap.get("language") || 'en';
    const from:any=route.queryParamMap.get("from") || null;
    const to:any=route.queryParamMap.get("to") || null;

    const form: IForm = {
      qInTitle:qInTitle,
      pageSize:pageSize,
      page:page,
      sortBy:sortBy,
      language:language,
      from:from,
      to:to
    };
    this._articleService.form=form;
    const query: string = new URLSearchParams(form as any).toString();
    return this._articleService
      .getArticles(query)
      .pipe(catchError((err) => of(err)));
  }
}
