import { Component, OnInit } from '@angular/core';
import { IToken, IUserInfo } from '../data/user-info.interface';
import { LoginService } from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
userInfo:IUserInfo={
  email:"eve.holt@reqres.in",
  password:"cityslicka"
}

  constructor(private _getUserService:LoginService, private _router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this._router.navigate(['/home'])
    }
  }
authorize(){
  console.log(this.userInfo);
  
  this._getUserService.getToken(this.userInfo).subscribe((data)=>{
    let tokenObj:IToken=data;
    if(tokenObj){
      localStorage.setItem("token",JSON.stringify(tokenObj.token));
      }
  });
  
}
}
