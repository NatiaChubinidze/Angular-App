import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

import { catchError, finalize } from 'rxjs/operators';

import { IRecommendation } from '../../shared/data/recommendations.interface';
import { FireBaseRecommendationService } from './recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {
  recommendationsArray: IRecommendation[] = [];

  selectedImage: any = null;
  editImg: boolean = false;
  imgSrc = 'https://image.flaticon.com/icons/png/128/1102/1102949.png';
  recommendation: IRecommendation = {
    email: '',
    articleTitle: '',
    articleAuthor: '',
    opinion: '',
    recommend: false,
    img: '',
  };

  email: FormControl;
  articleTitle: FormControl;
  articleAuthor: FormControl;
  opinion: FormControl;
  recommend: FormControl;
  image: FormControl;
  recForm:FormGroup;

  buttonHover: boolean = false;
  editMode: boolean = false;
errorMessage:string="";
  constructor(
    private _fireBaseStorage: AngularFireStorage,
    public _fireStoreService: FireBaseRecommendationService
  ) {
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    );
    this.articleAuthor = new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)]));
    this.articleTitle = new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)]));
    this.opinion = new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)]));
    this.image = new FormControl('', Validators.required);
    this.recForm=new FormGroup({
      email:this.email,
      articleAuthor:this.articleAuthor,
      articleTitle:this.articleTitle,
      opinion:this.opinion,
      image:this.image
    })
  }
  emailIsInvalid():boolean{
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  authorIsInvalid():boolean{
    return this.articleAuthor.invalid && (this.articleAuthor.touched || this.buttonHover);
  }
  titleIsInvalid():boolean{
    return this.articleTitle.invalid && (this.articleTitle.touched || this.buttonHover);
  }
  opinionIsInvalid():boolean{
    return this.opinion.invalid && (this.opinion.touched || this.buttonHover);
  }
  
  imageIsInvalid():boolean{
    return this.image.invalid || this.buttonHover;
  }
  toggleRecommendation(){
    this.recommendation.recommend=!this.recommendation.recommend;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._fireStoreService
      .getCollection('recommendations').pipe(catchError(this.handleError))
      .subscribe((recommendation) => {
        this.recommendationsArray = recommendation;
      });
  }

  editRecommendation(recommendation: IRecommendation) {
    this.recommendation = recommendation;
    this.email.setValue(this.recommendation.email);
    this.articleTitle.setValue(this.recommendation.articleTitle);
    this.articleAuthor.setValue(this.recommendation.articleAuthor);
    this.opinion.setValue(this.recommendation.opinion);
    this.image.setValue('');
    this.imgSrc = recommendation.img;
    this.editMode = true;
  }

  deleteRecommendation(recommendation: IRecommendation) {
    this.errorMessage="";
    this._fireStoreService.deleteItem('recommendations', recommendation.id).catch(err=>{this.errorMessage=err});
    this.deleteImage(recommendation);
  }

  deleteImage(recommendation: IRecommendation) {
    let image = this._fireBaseStorage.refFromURL(recommendation.img);
    image.delete().pipe(catchError(this.handleError)).subscribe();
  }

  onSubmit(event: any) {
    this.recommendation.email=this.email.value;
    this.recommendation.articleAuthor=this.articleAuthor.value;
    this.recommendation.articleTitle=this.articleTitle.value;
    this.recommendation.opinion=this.opinion.value;

    const files = event.target.querySelector('input').files[0];
    console.log(files);
    console.log(this.editImg);
    if (files && this.editImg) {
      console.log('new files exist');
      if (this.editMode) {
        console.log('edit mode files exist');
        this.editImage();
        this.editMode = false;
      } else {
        console.log('save image. files exist');
        this.saveImage();
      }
    } else if (this.editMode) {
      console.log('files not exist. edit mode');
      this.saveEdit();
      this.editMode = false;
      this.resetForm();
    } else {
      console.log('files not exist. save mode');
      this.saveToDatabase();
      this.resetForm();
    }
  }

  editImage() {
    if (this.selectedImage) {
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
          }),catchError(this.handleError)
        )
        .subscribe();
    }
  }

  saveEdit() {
    this._fireStoreService.editItem(
      'recommendations',
      this.recommendation.id,
      this.recommendation
    );
  }

  saveImage() {
    if (this.selectedImage) {
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
          }),catchError(this.handleError)
        )
        .subscribe();
    }
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
    this.editImg = false;
    this.recForm.reset;
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

  setEditImg() {
    console.log('set edit img');
    this.editImg = true;
  }
  private handleError(error: HttpErrorResponse) {
    this.errorMessage="";
    if (error.error instanceof ErrorEvent) {
     this.errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
     this.errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(this.errorMessage);
  }
}
