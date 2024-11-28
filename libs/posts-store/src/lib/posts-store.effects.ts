import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@nest-angular-monorepo/types';
import {
  createPost,
  createPostSuccess,
  getPosts,
  getPostsSuccess,
} from './posts-store.actions';
import { PostsService } from './posts.service';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private snackBar: MatSnackBar
  ) {}

  getPosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPosts),
        switchMap(() =>
          this.postsService
            .getPosts()
            .pipe(map((posts: Post[]) => getPostsSuccess({ posts })))
        )
      ),
    { functional: true }
  );

  createPost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPost),
        switchMap((action) =>
          this.postsService
            .createPost({ title: action.title, content: action.content })
            .pipe(map((post: Post) => createPostSuccess(post)))
        )
      ),
    { functional: true }
  );

  createPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPostSuccess),
        map(() => {
          this.snackBar.open('Post Created Successfully!', 'Close', {
            duration: 2000,
          });
        })
      ),
    { dispatch: false, functional: true }
  );
}
