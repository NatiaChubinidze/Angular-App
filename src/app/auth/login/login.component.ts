import { Component, OnInit } from '@angular/core';

import { IUserInfo } from '../../data/user-info.interface';
import { LoginService } from './login.service';

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
    
  ) {}

  ngOnInit(): void {}
  googleLogin() {
    this._getUserService.signInGoogle();
  }

  logInWithEmail() {
    this._getUserService.signInEmail(this.userInfo);
  }
  githubSignin() {
    this._getUserService.signInGithub();
  }
}
