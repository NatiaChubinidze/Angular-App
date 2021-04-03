import { Component, Input, OnInit } from '@angular/core';

import { IMemberInfo } from '../../data/member.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() membersArray: IMemberInfo[];
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
