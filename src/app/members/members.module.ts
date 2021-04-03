import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { MembersComponent } from './members.component';
import { PaginationComponent } from './pagination/pagination.component';

import { HttpCacheInterceptorService } from '../core/http-cache.interceptor';
import { MemberResolverService } from './member-resolver.service';

import { LoginGuardGuard } from '../auth/login-guard.guard';


@NgModule({
  declarations: [MembersComponent, PaginationComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'members',
        component: MembersComponent,
        canActivate:[LoginGuardGuard],
        resolve: {
          membersResponse: MemberResolverService,
        },
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptorService,
      multi: true,
    },
  ],
  exports: [MembersComponent],
})
export class MembersModule {}
