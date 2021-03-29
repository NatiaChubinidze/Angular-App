import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IRecommendation } from '../data/recommendations.interface';

@Injectable({
  providedIn: 'root',
})
export class FireBaseRecommendationService {
  constructor(
    private _firebaseStore: AngularFirestore,
    private _firebase: AngularFireDatabase
  ) {}

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

  deleteItem(collection: string, id: string) {
    return this._firebaseStore.collection(collection).doc(id).delete();
  }

  editItem(collection: string, id: string, data: IRecommendation) {
    return this._firebaseStore
      .collection(collection)
      .doc(id)
      .update({
        email: data.email,
        articleTitle: data.articleTitle,
        articleAuthor: data.articleAuthor,
        opinion: data.opinion,
        recommend: data.recommend,
        img: data.img,
      });
  }

  saveUserInfo(collection: string, data: any) {
    return this._firebaseStore.collection(collection).add(data);
  }
}
