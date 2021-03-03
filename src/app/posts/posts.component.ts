import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserinfo } from '../users/user';
import { IPosts } from '../users/user';
import { GetDataService } from '../users/users.getDataService';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() userInfo;
  @Output() onIconClick = new EventEmitter<boolean>();

  usersPosts: IPosts[];
  iconClick() {
    this.onIconClick.emit(true);
  }
  constructor(private _getDataService: GetDataService) {}

  ngOnInit(): void {
    this._getDataService.getPosts().subscribe((data: IPosts[]) => {
      this.usersPosts = data.filter(
        (element) => element.userId == this.userInfo.id
      );
    });
  }
}
