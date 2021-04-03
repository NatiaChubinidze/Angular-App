import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { ArticleModule } from './articles/article.module';
import { LoginModule } from './auth/login/login.module';
import { HomeModule } from './home/home/home.module';
import { MembersModule } from './members/members.module';
import { ProfileModule } from './profile/profile.module';
import { RecommendationsModule } from './recommendations/recommendation/recommendations.module';

import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    MenuComponent,
    ProfileComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ArticleModule,
    LoginModule,
    HomeModule,
    MembersModule,
    ProfileModule,
    RecommendationsModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot({
                    apiKey: "AIzaSyD0a0aNycl38R5ZqYtn74ZI23Nr29oUZV8",
                    authDomain: "angular-app-c3640.firebaseapp.com",
                    databaseURL: 'https://console.firebase.google.com/project/angular-app-c3640/firestore/data~2FProfiles~2FZo8ANYfd49mUPGGlTKWs',
                    projectId: "angular-app-c3640",
                    storageBucket: "angular-app-c3640.appspot.com",
                    messagingSenderId: "1013847471149"
                }),
    RouterModule.forRoot([
      {
        path: '**',
        component: PagenotfoundComponent,
      },
    ]),
    
    
  ],
  providers: [
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
