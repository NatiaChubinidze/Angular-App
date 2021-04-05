import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { IUserInfo } from '../../shared/data/user-info.interface';
import { LoginService } from '../login/login.service';
import {forbiddenNameValidator} from 'src/app/shared/forbidden-name.directive';
import {MustMatch} from 'src/app/shared/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userInfo: IUserInfo = {
    email: '',
    password: '',
    reEnterPassword:''
  };

  email: FormControl;
  password: FormControl;
  reEnterPassword:FormControl;
  authForm: FormGroup;

  buttonHover: boolean = false;

  constructor(public _getUserService: LoginService, private formBuilder:FormBuilder) {
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        forbiddenNameValidator(/test@test.com/i)
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
    this.reEnterPassword=new FormControl('',Validators.compose([Validators.required]))
    this.authForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      reEnterPassword:this.reEnterPassword
    },{validators:MustMatch('password','reEnterPassword')});
    
  }
 

  
confirmPasswordIsInvalid():boolean{
return this.reEnterPassword.invalid && (this.reEnterPassword.touched && (this.password.value && this.reEnterPassword.value!==this.password.value) || this.buttonHover);
}
  emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched || this.buttonHover);
  }
  ngOnInit(): void {}

  register(){
    this.userInfo=this.authForm.value as IUserInfo;
    this._getUserService.register(this.userInfo);
  }

 

}
