import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { capitalize } from './pipes/pipes';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArticlesComponent } from './articles/articles.component';
import { MenuComponent } from './menu/menu.component';
import { CardComponent } from './articles/card/card.component';
import { ArticleSeeMoreComponent } from './articles/article-see-more/article-see-more.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    capitalize,
    PostsComponent,
    PagenotfoundComponent,
    MenuComponent,
    ArticlesComponent,
    CardComponent,
    ArticleSeeMoreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'articles-see-more/:title/:language',
        component: ArticleSeeMoreComponent,
      },
      {
        path: 'articles/:language',
        component: ArticlesComponent,
      },
      {
        path: 'posts/:id',
        component: PostsComponent,
      },
      {
        path:'home',
        component:UsersComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PagenotfoundComponent,
      },
    ]),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
