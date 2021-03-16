import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';


import { MembersService } from './members.service';
import { IMember } from '../data/member.interface';


@Injectable({
  providedIn: 'root',
})
export class MemberResolverService implements Resolve<IMember> {
  constructor(private _membersService: MembersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMember> {

    return this._membersService
      .getAllMembers()
      .pipe(catchError((err) => of(err)));
  }
}
