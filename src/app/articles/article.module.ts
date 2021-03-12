import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { CardComponent } from './card/card.component';
import { ArticleSeeMoreComponent } from './article-see-more/article-see-more.component';
import { LoginGuardGuard } from '../login-guard.guard';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



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
      },{
        path: 'articles-see-more/:title/:language',
        component: ArticleSeeMoreComponent,
      }
    ])
  ]
})
export class ArticleModule { }
