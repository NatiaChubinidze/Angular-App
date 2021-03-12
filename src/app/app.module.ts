import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MenuComponent } from './menu/menu.component';
import { LoginGuardGuard } from './login-guard.guard';


import { ArticleModule } from './articles/article.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ArticleModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot([
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
