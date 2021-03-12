import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from 'src/app/users/users.component';
import { capitalize } from 'src/app/pipes/pipes';
import { PostsComponent } from 'src/app/posts/posts.component';




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
      },
      {
        path:'home',
        component:UsersComponent,
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
