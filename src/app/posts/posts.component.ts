import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPosts, IUser } from '../users/user';
import { GetDataService } from '../users/users.getDataService';
import { UserService } from '../users/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit,OnDestroy {
  userId: number;
  userInfo: IUser;
  usersPosts: IPosts[];

  constructor(
    private _getDataService: GetDataService,
    private _activeRoute: ActivatedRoute,
    private _userService: UserService
  ) {
    this.userId = parseInt(this._activeRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._getDataService.getPosts().subscribe((data: IPosts[]) => {
      this.usersPosts = data.filter((element) => element.userId == this.userId);
    });

    this.userInfo = this._userService
      .getUsers()
      .filter((item) => item.id == this.userId)[0];
  }
  ngOnDestroy():void {}
}
