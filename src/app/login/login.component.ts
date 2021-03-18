import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

import { IToken, IUserInfo } from '../data/user-info.interface';
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

  constructor(private _getUserService: LoginService, private _router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this._router.navigate(['/home']);
    }
  }

  authorize() {
    this._getUserService
      .getToken(this.userInfo)
      .subscribe((signedIn: boolean) => {
        if (signedIn) {
          this._router.navigate(['/home']);
        }
      });
  }
}
