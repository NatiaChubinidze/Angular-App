import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticlesService } from './articles.service';
import { IArticle, ILanguage } from './article-interfaces';
import { NgForm } from '@angular/forms';
import { IForm, SortBy } from '../data/filter-form.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articlesArray: IArticle[];
  form: IForm = {
    qInTitle: 'twitter',
    pageSize: 20,
    page: 2,
    language: 'en',
  };
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
    this.form.language = this._language;
  }
  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
  ngOnInit(): void {
    this.loadArticles();
    this.defaultLanguage = this.languages.filter(
      (language) => language.code == this.language
    )[0].languageValue;
  }

  private loadArticles() {
    // @ts-ignore
    const query: string = new URLSearchParams(this.form).toString();
    this._getArticles.getArticles(query).subscribe((data: IArticle[]) => {
      this.articlesArray = data['articles'];
      console.log(this.articlesArray);
    });
  }

  ngOnDestroy(): void {}
  changeLanguage(event): IArticle[] {
    this.language = event.target.value;
    this.loadArticles();
    return this.articlesArray;
  }

  onFormSubmit() {
    this.loadArticles();
  }
}
