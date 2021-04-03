import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { UsersComponent } from 'src/app/users/users.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { LoginGuardGuard } from 'src/app/auth/login-guard.guard';
import { capitalize } from 'src/app/pipes/pipes';


@NgModule({
  declarations: [
    UsersComponent,
    capitalize,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'posts/:id',
        component: PostsComponent,
        canActivate:[LoginGuardGuard]
      },
      {
        path:'home',
        component:UsersComponent,
        canActivate:[LoginGuardGuard]
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ])
  ]
})
export class HomeModule { }
