import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post, User } from '@nest-angular-monorepo/types';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import {
  selectsPosts,
  getPosts,
  emptyPosts,
} from '@nest-angular-monorepo/posts-store';
import {
  logout,
  selectAuthenticatedUser,
} from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  currentUser$: Observable<User>;
  posts$: Observable<Post[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.currentUser$ = this.store.select(
      selectAuthenticatedUser
    ) as Observable<User>;

    this.posts$ = this.store.select(selectsPosts) as Observable<Post[]>;
  }

  ngOnInit() {
    this.store.dispatch(getPosts());
  }

  logout() {
    this.store.dispatch(logout());
    this.store.dispatch(emptyPosts());
  }

  openCreateModal() {
    this.dialog.open(CreatePostComponent);
  }
}
