import { Component, OnInit, Input } from '@angular/core';
import { IArticleDetails } from '../article-interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item?: IArticleDetails;
  @Input() language: string;
  constructor() {}

  ngOnInit(): void {
    console.log(this.language);
  }
}
