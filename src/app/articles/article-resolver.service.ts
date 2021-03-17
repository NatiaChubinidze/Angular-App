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
    const form: IForm = {
      qInTitle: 'twitter',
      pageSize: 20,
      page: 2,
      language: 'en',
    };
    const query: string = new URLSearchParams(form as any).toString();
    return this._articleService
      .getArticles(query)
      .pipe(catchError((err) => of(err)));
  }
}
