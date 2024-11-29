import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@nest-angular-monorepo/types';
import {
  createPost,
  createPostFailure,
  createPostSuccess,
  getPosts,
  getPostsFailure,
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
          this.postsService.getPosts().pipe(
            map((posts: Post[]) => getPostsSuccess({ posts })),
            catchError((error) => [
              getPostsFailure({
                error: error.error?.message || error.message,
              }),
            ])
          )
        )
      ),
    { functional: true }
  );

  getPostsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPostsFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );

  createPost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPost),
        switchMap((action) =>
          this.postsService
            .createPost({ title: action.title, content: action.content })
            .pipe(
              map((post: Post) => createPostSuccess(post)),
              catchError((error) => [
                createPostFailure({
                  error: error.error?.message || error.message,
                }),
              ])
            )
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

  createPostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPostFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );
}
