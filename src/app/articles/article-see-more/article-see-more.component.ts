import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticle, IArticleDetails } from '../article-interfaces';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-see-more',
  templateUrl: './article-see-more.component.html',
  styleUrls: ['./article-see-more.component.scss'],
})
export class ArticleSeeMoreComponent implements OnInit, OnDestroy {
  articleTitle: string;
  articleLanguage: string;
  currentArticle: IArticleDetails;
  articleDate: Date;
  constructor(
    private _activeRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {
    this.articleDate = new Date();
  }

  ngOnInit(): void {
    this.articleTitle = this._activeRoute.snapshot.paramMap.get('title');
    console.log(this.articleTitle);
    this.articleLanguage = this._activeRoute.snapshot.paramMap.get('language');
    console.log(this.articleLanguage);
    this.articlesService
      .getArticle(this.articleTitle,this.articleLanguage)
      .subscribe((data: IArticle[]) => {
        const articles = data['articles'];
        console.log(data);
        this.currentArticle = articles.filter((item) => {
          return this.articleTitle == item.title;
        })[0];
        console.log(this.currentArticle);
        this.articleDate = new Date(this.currentArticle.publishedAt);
      });
  }

  ngOnDestroy():void {}
}
