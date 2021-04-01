import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../data/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      if (!this._loginService.tokenIsValid()) {
        if (this._loginService.googleAuth) {
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

  onSignOut() {
    if (this._loginService.googleAuth) {
      this.auth.signOut();
      this._loginService.googleAuth = false;
    }
    this._loginService.signOut();
    this._router.navigate(['/login']);
  }
}
