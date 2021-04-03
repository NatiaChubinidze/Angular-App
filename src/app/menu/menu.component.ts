import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { LoginService } from '../auth/login/login.service';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../data/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    public _loginService: LoginService,
    private _router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(TOKEN_KEY)) {
      setInterval(() => {
        if (!this._loginService.tokenIsValid()) {
          if (this._loginService.googleAuth && this._loginService.userIsActive()) {
            
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then((token) => {
                localStorage.setItem(TOKEN_KEY, token);
                this._loginService.setTokenValidTime();
              })
              .catch(() => {});
          } else {
            this._loginService.signOut();
            this._router.navigate(['/login']);
          }
          if (TOKEN_EXP_KEY) {
            localStorage.removeItem(TOKEN_EXP_KEY);
          }
        }
      }, EXP_TIME);
    }
  }

  onSignOut() {
    console.log("sign out");
    console.log(this.auth.signOut());
    this._loginService.signOut();
  }
}
