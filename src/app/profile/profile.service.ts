import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(private _firebaseStore: AngularFirestore) {}

 getCollection(collection: string) {
    return this._firebaseStore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((doc) => {
            const data: any = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
        })
      );
  }

async clearUserInfo(collection:string, id:string){
  return this._firebaseStore.collection(collection).doc(id).update({userId:"",name:"",email:"",phone:"",profession:""});
}

async saveUserInfo(collection:string,id:string,data:any){
  return this._firebaseStore.collection(collection).doc(id).update({userId:data.userId,name:data.name,email:data.email,phone:data.phone,profession:data.profession});
}

}
