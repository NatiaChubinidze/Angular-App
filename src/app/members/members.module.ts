import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';

import { MemberResolverService } from './member-resolver.service';
import { MembersComponent } from './members.component';
import { HttpCacheInterceptorService } from '../core/http-cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [MembersComponent, PaginationComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'members',
        component: MembersComponent,
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
