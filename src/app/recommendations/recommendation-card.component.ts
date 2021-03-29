import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { IRecommendation } from '../data/recommendations.interface';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.scss'],
})
export class RecommendationCardComponent implements OnInit {
  @Input() recommendation: IRecommendation;
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditIconClick() {
    this.onEditClick.emit(this.recommendation);
  }
  onDeleteIconClick(){
    this.onDeleteClick.emit(this.recommendation);
  }
}
