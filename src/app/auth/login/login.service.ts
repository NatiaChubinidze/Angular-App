import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import {
  TOKEN_KEY,
  TOKEN_EXP_KEY,
  TOKEN_TTL,
} from '../../shared/data/constants';
import { IUserInfo } from 'src/app/shared/data/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser$ = new Observable<firebase.User | null>();

  githubAuth: boolean;
  googleAuth: boolean;
  errorMessage: string;
  constructor(private _router: Router, private auth: AngularFireAuth) {
    this.currentUser$ = this.auth.authState;
  }

  setTokenValidTime(): void {
    const date = new Date();
    date.setMinutes(new Date().getMinutes() + TOKEN_TTL);
    localStorage.setItem(TOKEN_EXP_KEY, date.toJSON());
  }

  tokenIsValid(): boolean {
    const timeNow = new Date().getTime();
    const tokenValidTill = new Date(
      localStorage.getItem(TOKEN_EXP_KEY)
    ).getTime();
    return timeNow < tokenValidTill;
  }

  authIsSecure(): boolean {
    const timeNow = new Date().getTime();
    const tokenValidTill = new Date(
      localStorage.getItem(TOKEN_EXP_KEY)
    ).getTime();
    return tokenValidTill - timeNow > 3000;
  }

  signOut(): void {
    console.log('auth sign out firebase');
    this.auth.signOut();
    if (localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
    }
    if (localStorage.getItem(TOKEN_EXP_KEY)) {
      localStorage.removeItem(TOKEN_EXP_KEY);
    }
    this._router.navigate(['/login']);
  }

  isSignedIn(): boolean {
    if (localStorage.getItem(TOKEN_KEY)) {
      return true;
    } else return false;
  }

  signInGithub() {
    this.errorMessage = null;
    this.githubAuth = true;
    this.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signInGoogle() {
    this.errorMessage = null;
    this.googleAuth = true;
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signInEmail(data: IUserInfo) {
    this.errorMessage = null;
    this.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userInfo) => {
        console.log(userInfo);
        if (userInfo.user) {
          localStorage.setItem(TOKEN_KEY, userInfo.user.refreshToken);
          this.setTokenValidTime();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  register(userInfo) {
    this.errorMessage = null;
    this.auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem(TOKEN_KEY, data.user.refreshToken);
          this.setTokenValidTime();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  userIsActive() {
    return this.currentUser$.pipe(
      map((userInfo: any) => {
        if (userInfo && userInfo.uid) {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
