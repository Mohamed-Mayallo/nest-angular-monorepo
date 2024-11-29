import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '@nest-angular-monorepo/types';
import { logout } from '@nest-angular-monorepo/auth-store';
import { Store } from '@ngrx/store';
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
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  getPosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPosts),
        switchMap(() =>
          this.postsService.getPosts().pipe(
            map((posts: Post[]) => getPostsSuccess({ posts })),
            catchError((error) =>
              of(
                getPostsFailure({
                  error: error.error?.message || error.message,
                  statusCode: error.status,
                })
              )
            )
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
          if (action.statusCode === 401) {
            this.store.dispatch(logout());
          }

          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );

  createPost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createPost),
        switchMap((action) =>
          this.postsService
            .createPost({ title: action.title, content: action.content })
            .pipe(
              map((post: Post) => createPostSuccess(post)),
              catchError((error) =>
                of(
                  createPostFailure({
                    error: error.error?.message || error.message,
                    statusCode: error.status,
                  })
                )
              )
            )
        )
      );
    },
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
          if (action.statusCode === 401) {
            this.store.dispatch(logout());
          }

          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );
}
