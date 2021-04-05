import { Component, OnInit } from '@angular/core';

import { IProfile } from '../shared/data/profile.interface';
import { FireBaseService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileInfo:IProfile={
    userId:"",
    name:"",
    email:"",
    phone:"",
    profession:"",
    id:"",
  };
  constructor(private _fireStoreService: FireBaseService) {}

  ngOnInit(): void {
   this.loadProfileInfo();
    
  }

  loadProfileInfo() {
    this._fireStoreService.getCollection('Profiles').subscribe(profileInfo=>{
      this.profileInfo=profileInfo[0];
    })
  }

  async clearUserData(){
    console.log("click");
    const result=await this._fireStoreService.clearUserInfo("Profiles",this.profileInfo.id);
  } 
  
  async saveChanges(){
    console.log("saving");
    console.log(this.profileInfo);
    const result=await this._fireStoreService.saveUserInfo('Profiles',this.profileInfo.id,this.profileInfo);
  }
}
