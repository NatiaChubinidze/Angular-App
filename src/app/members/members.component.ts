import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMember, IMemberInfo } from '../data/member.interface';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
  membersArray: IMemberInfo[];
  
  constructor(private _memberService: MembersService, private _route:ActivatedRoute) {}

  // getMembers() {
  //   this._memberService.getAllMembers().subscribe((result: IMember) => {
  //     this.membersArray = result.data;
  //   });
  //}
  ngOnInit(): void {
    // this.getMembers();
    const result:IMember=this._route.snapshot.data['membersResponse'];
    this.membersArray=result.data;
    console.log(this.membersArray);
  }
  ngOnDestroy(): void {}
}
