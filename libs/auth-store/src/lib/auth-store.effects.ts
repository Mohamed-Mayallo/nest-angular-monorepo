import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  login,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  register,
} from './auth-store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        delay(2000),
        switchMap((action) =>
          this.authService.login(action.email, action.password).pipe(
            map((token: string) => loginSuccess({ token })),
            catchError((error) => [loginFailure({ error: error.message })])
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
          this.snackBar.open('Login Successful!', 'Close');
        })
      ),
    { dispatch: false, functional: true }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close');
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
            .register(action.name, action.email, action.password)
            .pipe(
              map((token: string) => registerSuccess({ token })),
              catchError((error) => [registerFailure({ error: error.message })])
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
          this.snackBar.open('Register Successful!', 'Close');
        })
      ),
    { dispatch: false, functional: true }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close');
        })
      ),
    { dispatch: false, functional: true }
  );
}
