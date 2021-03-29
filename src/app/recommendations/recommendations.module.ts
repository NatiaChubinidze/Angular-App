import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from './recommendations.component';
import { RouterModule } from '@angular/router';
import { RecommendationCardComponent } from './recommendation-card.component';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
 
import { BrowserModule } from '@angular/platform-browser';
import {firebaseConfig} from 'src/firebaseConfig';


@NgModule({
  declarations: [RecommendationsComponent, RecommendationCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule.forChild([
      { 
        path: 'recommendations', 
        component: RecommendationsComponent 
      },
    ]),
  ],
})
export class RecommendationsModule {}
