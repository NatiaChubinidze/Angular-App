import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { IUser, IUserinfo } from './user';
import { IPosts } from './user';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @Output() onClick = new EventEmitter<boolean>();
  @Output() onClickData = new EventEmitter<any>();

  userClick(item) {
    this.onClick.emit(true);
    this.onGetUserData(item);
  }
  onGetUserData(item) {
    this.onClickData.emit(item);
  }
  usersList: IUser[] = [];
  usersPosts: IPosts[] = [];

  filteredUsers: IUser[] = [];
  usersVisible = true;
  private _searchTerm;

  constructor(private _usersService: UserService) {}

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;

    if (this._searchTerm) {
      this.filteredUsers = this.usersList.filter((element) => {
        return (
          element.id.toString() === this._searchTerm ||
          element.name
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase()) ||
          element.username
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase()) ||
          element.website
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase()) ||
          element.email
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase()) ||
          element.phone
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase()) ||
          element.company.name
            .toLocaleLowerCase()
            .includes(this._searchTerm.toLocaleLowerCase())
        );
      });
    } else {
      this.filteredUsers = this.usersList.slice();
    }
  }

  toggleUsers() {
    this.usersVisible = !this.usersVisible;
  }

  ngOnInit(): void {
    this.usersList = this._usersService.getProducts();
    this.searchTerm = '';
  }

  ngOnDestroy(): void {}
}
