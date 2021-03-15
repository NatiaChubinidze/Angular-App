import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ArticlesComponent } from './articles.component';
import { CardComponent } from './card/card.component';
import { ArticleSeeMoreComponent } from './article-see-more/article-see-more.component';
import { LoginGuardGuard } from '../login-guard.guard';
import {ArticleResolverService} from './article-resolver.service'


@NgModule({
  declarations: [
    ArticlesComponent,
    CardComponent,
    ArticleSeeMoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'articles/:language',
        component: ArticlesComponent,
        resolve:{
          articlesResponse:ArticleResolverService
        }
      },{
        path: 'articles-see-more/:title/:language',
        component: ArticleSeeMoreComponent,
      }
    ])
  ]
})
export class ArticleModule { }
