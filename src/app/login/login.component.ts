import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUserInfo } from '../data/user-info.interface';
import { LoginService } from './login.service';
import firebase from 'firebase/app';

import {
  TOKEN_KEY,
  TOKEN_EXP_KEY,
  TOKEN_TTL,
  EXP_TIME,
} from '../data/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userInfo: IUserInfo = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  constructor(
    private _getUserService: LoginService,
    private _router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/home']);
    }
  }
  login() {
    this._getUserService.googleAuth = true;
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this._router.navigate(['/home']);
        }
        localStorage.setItem(TOKEN_KEY, data.credential.accessToken);
        localStorage.setItem('REFRESH_TOKEN', data.user.refreshToken);
        this._getUserService.setTokenValidTime();
      });
  }
  authorize() {
    this._getUserService.googleAuth = false;
    this._getUserService
      .getToken(this.userInfo)
      .subscribe((signedIn: boolean) => {
        if (signedIn) {
          this._router.navigate(['/home']);
        }
      });
  }
}
