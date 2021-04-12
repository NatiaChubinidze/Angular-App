import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILanguage } from '../articles/article-interfaces';

import { IProfile } from '../shared/data/profile.interface';
import { FireBaseService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  lang$: Observable<ILanguage>;
  translate = {
    KA: {
      prof: 'ვებ დეველოპერი და დიზაინერი',
      ranking:'რეიტინგი',
      clearInfo: 'წაშლა',
      saveInfo:"შენახვა",
      about:"ჩემ შესახებ",
      userId:"მომხმარებლის ID",
      name:"სახელი",
      email:"მეილი",
      phone:"ტელეფონი",
      profession:"პროფესია",
      changePhoto:"ფოტოს ცვლილება",
      links:"ლინკები",
      skills:"უნარები",
      webDesigner:"ვებ დიზაინერი",
      webDeveloper:"ვებ დეველოპერი",
      timeline:"თაიმლაინი",
    },
    EN: {
      prof: 'Web Developer and Designer',
      ranking:"RANKINGS",
      clearInfo:"Clear Info",
      saveInfo:"Save Changes",
      about:"About",
      userId:"User Id",
      name:"Name",
      email:"Email",
      phone:"Phone",
      profession:"Profession",
      changePhoto:"Change Photo",
      links:"Links",
      skills:"SKILLS",
      webDesigner:"Web Designer",
      webDeveloper:"Web Developer",
      timeline:"Timeline",
    },
    DE: {
      prof: 'Webdesigner und Entwickler',
      ranking:"Rangfolge",
      clearInfo:"löschen",
      saveInfo:"speichern",
      about:"über mich",
      userId:"Benutzeridentifikation",
      name:"Name",
      email:"Email",
      phone:"Telefonnummer",
      profession:"Beruf",
      changePhoto:"Foto ändern",
      links:"Links",
      skills:"Kompetenzen",
      webDesigner:"Webdesigner",
      webDeveloper:"Web-Entwickler",
      timeline:"Zeitleiste",
    },
  };
  translated = {
    prof: 'Web Developer and Designer',
    ranking:"RANKINGS",
    clearInfo:"Clear Info",
    saveInfo:"Save Changes",
    about:"About",
    userId:"User Id",
    name:"Name",
    email:"Email",
    phone:"Phone",
    profession:"Profession",
    changePhoto:"Change Photo",
    links:"Links",
    skills:"SKILLS",
    webDesigner:"Web Designer",
    webDeveloper:"Web Developer",
    timeline:"Timeline",
  };
  profileInfo:IProfile={
    userId:"",
    name:"",
    email:"",
    phone:"",
    profession:"",
    id:"",
  };
  constructor(private _fireStoreService: FireBaseService, private store: Store<any>) {
    this.lang$ = this.store.select('app');
  }

  ngOnInit(): void {
   this.loadProfileInfo();
   this.lang$.subscribe((lang) => {
    // @ts-ignore
    this.translated = this.translate[lang.activeLang];
  });
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
