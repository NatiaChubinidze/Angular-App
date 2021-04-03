import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router} from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router:Router, private _loginService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(!this._loginService.authIsSecure()){
      // this.router.navigate(["/home"]);
      // console.log("Not Enough Time");
      // } 
    return this._loginService.userIsActive();
  }

  
}
