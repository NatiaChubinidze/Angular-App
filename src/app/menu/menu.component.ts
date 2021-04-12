import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import {Store} from '@ngrx/store';

import { LoginService } from '../auth/login/login.service';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../shared/data/constants';
import {Languages} from '../ngrx/state/language.interface';
import {changeLanguage} from '../ngrx/state/language.actions';
import { ILanguage } from '../articles/article-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  langs:Array<string>=[];
  activeLang$: Observable<ILanguage>;
  activeLang:string='EN';
  constructor(
    public _loginService: LoginService,
    private _router: Router,
    private store: Store<any>
  ) {
    this.activeLang$ = this.store.select('app');
  }

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
    
    this.langs=Object.keys(Languages).filter((item)=>isNaN(Number(item)));

  }

  onChangeLanguage(newLang:string):void{
    console.log(newLang);
    this.store.dispatch(changeLanguage({newLang}))
  }

  onSignOut() {
    this._loginService.signOut();
    
  }
}
