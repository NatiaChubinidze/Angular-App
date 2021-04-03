import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';

import {firebaseConfig} from 'src/firebaseConfig';

import { RecommendationsComponent } from './recommendations.component';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';


@NgModule({
  declarations: [RecommendationsComponent, RecommendationCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
