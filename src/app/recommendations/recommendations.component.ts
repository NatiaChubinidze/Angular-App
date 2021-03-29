import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IRecommendation } from '../data/recommendations.interface';
import { finalize } from 'rxjs/operators';
import { FireBaseRecommendationService } from './recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {
  recommendationsArray: IRecommendation[] = [];
  selectedImage: any = null;
  imgSrc = 'https://image.flaticon.com/icons/png/128/1102/1102949.png';
  recommendation: IRecommendation = {
    email: '',
    articleTitle: '',
    articleAuthor: '',
    opinion: '',
    recommend: false,
    img: '',
  };

  editMode: boolean = false;
  constructor(
    private _fireBaseStorage: AngularFireStorage,
    private _fireStoreService: FireBaseRecommendationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  editRecommendation(recommendation: IRecommendation) {
    this.recommendation = recommendation;
    this.imgSrc=recommendation.img;
    this.editMode = true;
  }
  deleteRecommendation(recommendation: IRecommendation) {
    this._fireStoreService.deleteItem('recommendations', recommendation.id);
    this.deleteImage(recommendation);
  }

  loadData() {
    this._fireStoreService
      .getCollection('recommendations')
      .subscribe((recommendation) => {
        this.recommendationsArray = recommendation;
      });
  }
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = 'https://image.flaticon.com/icons/png/128/1102/1102949.png';
      this.selectedImage = null;
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.editImage();
      this.editMode = false;
    } else {
      this.saveImage();
    }
  }

  editImage() {
    this.deleteImage(this.recommendation);
    let filePath = `${this.selectedImage.name}_${new Date().getTime()}}`;
    const fileRef = this._fireBaseStorage.ref(filePath);
    this._fireBaseStorage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.recommendation.img = url;

            this.saveEdit();
            //this.recommendationsArray.push(this.recommendation);
            this.resetForm();
          });
        })
      )
      .subscribe();
  }

  deleteImage(recommendation: IRecommendation) {
    let image = this._fireBaseStorage.refFromURL(recommendation.img);
    image.delete().subscribe();
  }
  saveImage() {
    let filePath = `${this.selectedImage.name}_${new Date().getTime()}}`;
    const fileRef = this._fireBaseStorage.ref(filePath);
    this._fireBaseStorage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.recommendation.img = url;

            this.saveToDatabase();
            this.recommendationsArray.push(this.recommendation);
            this.resetForm();
          });
        })
      )
      .subscribe();
  }

  saveEdit() {
    this._fireStoreService.editItem(
      'recommendations',
      this.recommendation.id,
      this.recommendation
    );
  }
  saveToDatabase() {
    this._fireStoreService.saveUserInfo('recommendations', this.recommendation);
  }

  resetForm() {
    this.selectedImage = null;
    this.imgSrc = 'https://image.flaticon.com/icons/png/128/1102/1102949.png';
    this.recommendation = {
      email: '',
      articleTitle: '',
      articleAuthor: '',
      opinion: '',
      recommend: false,
      img: '',
    };
  }
}
