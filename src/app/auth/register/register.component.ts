import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login/login.service';
import { IUserInfo } from 'src/app/data/user-info.interface';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userInfo: IUserInfo = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  constructor(
    private _getUserService: LoginService,
  ) {}
 
  register(){
    this._getUserService.register(this.userInfo);
  }

  ngOnInit(): void {
  }

}
