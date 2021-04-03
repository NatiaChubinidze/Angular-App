import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ArticlesComponent } from './articles.component';
import { CardComponent } from './card/card.component';
import { ArticleSeeMoreComponent } from './article-see-more/article-see-more.component';
import { LoginGuardGuard } from '../auth/login-guard.guard';
import {ArticleResolverService} from './article-resolver.service'

import { ArticleHeaderInterceptorService } from './add-header.interceptor.service';
import { HttpCacheInterceptorService } from '../core/http-cache.interceptor';


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
        canActivate:[LoginGuardGuard],
        resolve:{
          articlesResponse:ArticleResolverService
        }
      },{
        path: 'articles-see-more/:title/:language',
        component: ArticleSeeMoreComponent,
        canActivate:[LoginGuardGuard],
      }
    ])
  ],
  providers:[
  { provide:HTTP_INTERCEPTORS,
    useClass:ArticleHeaderInterceptorService,
    multi:true
  },
  { provide:HTTP_INTERCEPTORS,
    useClass:HttpCacheInterceptorService,
    multi:true
  }
],
exports:[
  ArticlesComponent
],
})
export class ArticleModule { }
