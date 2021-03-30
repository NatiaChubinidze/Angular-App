import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    LoginComponent
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
    }
    ])
  ]
})
export class LoginModule { }
