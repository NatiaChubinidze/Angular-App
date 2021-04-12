import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IUserInfo } from '../../shared/data/user-info.interface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userInfo: IUserInfo = {
    email: '',
    password: '',
  };
  email: FormControl;
  password: FormControl;
  authForm: FormGroup;
  buttonHover: boolean = false;

  constructor(public _getUserService: LoginService, private route:Router) {
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    );
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
        ),
      ])
    );
    this.authForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched || this.buttonHover);
  }
  ngOnInit(): void {
    if(this._getUserService.userIsActive()){
      this.route.navigate(['/home']);
    }
  }

  googleLogin() {
    this._getUserService.signInGoogle();
  }

  logInWithEmail() {
    this.userInfo = this.authForm.value as IUserInfo;
    this._getUserService.signInEmail(this.userInfo);
    console.log(this.userInfo);
  }
  githubSignin() {
    this._getUserService.signInGithub();
  }
}
