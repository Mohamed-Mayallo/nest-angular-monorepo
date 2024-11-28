import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  login,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  register,
  logout,
} from './auth-store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@nest-angular-monorepo/types';
import { getPosts } from '@nest-angular-monorepo/posts-store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap((action) =>
          this.authService
            .login({ email: action.email, password: action.password })
            .pipe(
              map((user: User) =>
                loginSuccess({ token: user.token as string, user })
              ),
              catchError((error) => [
                loginFailure({ error: error.error?.message || error.message }),
              ])
            )
        )
      ),
    { functional: true }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map(() => {
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 2000,
          });
          getPosts();
          this.router.navigateByUrl('/posts');
        })
      ),
    { dispatch: false, functional: true }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', {
            duration: 2000,
          });
        })
      ),
    { dispatch: false, functional: true }
  );

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        switchMap((action) =>
          this.authService
            .register({
              name: action.name,
              email: action.email,
              password: action.password,
            })
            .pipe(
              map((user: User) =>
                registerSuccess({ token: user.token as string, user })
              ),
              catchError((error) => [
                registerFailure({
                  error: error.error?.message || error.message,
                }),
              ])
            )
        )
      ),
    { functional: true }
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        map(() => {
          this.snackBar.open('Register Successful!', 'Close', {
            duration: 2000,
          });
          this.router.navigateByUrl('/posts');
        })
      ),
    { dispatch: false, functional: true }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false, functional: true }
  );
}
