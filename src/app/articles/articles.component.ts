import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ArticlesService } from './articles.service';
import { IArticle, ILanguage } from './article-interfaces';
import { IForm } from '../data/filter-form.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articlesArray: IArticle[];
  form:IForm | undefined;
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
    private _activeRoute: ActivatedRoute,
    private route:Router
  ) {
    this._language = this._activeRoute.snapshot.paramMap.get('language');
    this._getArticles.form.language = this._language;
  }
  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
  ngOnInit(): void {
    // this.loadArticles();

    const result:IArticle[]=this._activeRoute.snapshot.data['articlesResponse'];
    this.articlesArray=result["articles"];
    

    this.defaultLanguage = this.languages.filter(
      (language) => language.code == this.language
    )[0].languageValue;
    this.form=this._getArticles.form;
  }

  private loadArticles() {
    
    const params={
      ...this.form,
      qInTitle:this.form.qInTitle,
        pageSize:this.form.pageSize,
        page:this.form.page,
        language:this.form.language
    }
    console.log(this.form);
    this.route.navigate([],{
      queryParamsHandling:'merge',
      replaceUrl:true,
      queryParams:params
    })
    const query: string = new URLSearchParams(this.form as any).toString();
    this._getArticles.getArticles(query).subscribe((data: IArticle[]) => {
      this.articlesArray = data['articles'];
      
    });
  }

  ngOnDestroy(): void {}
  changeLanguage(event) {
    this.language = event.target.value;
    this.form.language=this.language;
    this.loadArticles();
  
  }

  onFormSubmit() {
    this.loadArticles();
  }
}
