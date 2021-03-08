import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticlesService } from './articles.service';
import { IArticle, ILanguage } from './article-interfaces';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articlesArray: IArticle[];
  _language: string;
  defaultLanguage: string;
  languages: ILanguage[] = [
    { code: 'en', languageValue: 'English' },
    { code: 'de', languageValue: 'German' },
    { code: 'ar', languageValue: 'Arabic' },
    { code: 'es', languageValue: 'Spanish' },
    { code: 'fr', languageValue: 'French' },
    { code: 'it', languageValue: 'Italian' },
    { code: 'ru', languageValue: 'Russian' },
  ];
  constructor(
    private _getArticles: ArticlesService,
    private _activeRoute: ActivatedRoute
  ) {
    this._language = this._activeRoute.snapshot.paramMap.get('language');
  }
  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
  ngOnInit(): void {
    this._getArticles
      .getArticles('technology', 24, 1, this.language)
      .subscribe((data: IArticle[]) => {
        this.articlesArray = data['articles'];
      });
    this.defaultLanguage = this.languages.filter(
      (language) => language.code == this.language
    )[0].languageValue;
    console.log('default language', this.defaultLanguage);
  }

  ngOnDestroy():void {}
  changeLanguage(event): IArticle[] {
    this.language = event.target.value;
    this._getArticles
      .getArticles('technology', 24, 1, this.language)
      .subscribe((data: IArticle[]) => {
        console.log(this.language);
        this.articlesArray = data['articles'];
      });
    return this.articlesArray;
  }
}
