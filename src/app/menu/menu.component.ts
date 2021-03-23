import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { EXP_TIME, TOKEN_EXP_KEY } from '../data/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private _loginService:LoginService, private _router:Router) {}

  ngOnInit(): void {
    setInterval(()=>{
      if(!this._loginService.tokenIsValid()){
        this._loginService.signOut();
        localStorage.removeItem(TOKEN_EXP_KEY);
        this._router.navigate(['/login']);
      }
    },EXP_TIME);
    
  }

  onSignOut(){
    this._loginService.signOut();
    this._router.navigate(['/login']);
  }
}
