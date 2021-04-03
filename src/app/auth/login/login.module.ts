import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      {
      path:'login',
      component:LoginComponent
    },
    {
      path:'register',
      component:RegisterComponent
    }
    ])
  ]
})
export class LoginModule { }
