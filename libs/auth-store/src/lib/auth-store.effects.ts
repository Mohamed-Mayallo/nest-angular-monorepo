import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@nest-angular-monorepo/types';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectExpirationTime } from './auth-store.selectors';
import { ForgetPasswordComponent } from '../../../../apps/frontend/src/app/forget-password/forget-password/forget-password.component';
import { MatDialog } from '@angular/material/dialog';
import {
  login,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  register,
  logout,
  trackTokenExpiration,
  sendVerificationCodeFailure,
  sendVerificationCodeSuccess,
  sendVerificationCode,
  forgetPassword,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} from './auth-store.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {}

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(login),
        switchMap((action) =>
          this.authService
            .login({ email: action.email, password: action.password })
            .pipe(
              map((user: User) =>
                loginSuccess({
                  token: user.token as string,
                  user,
                  isLoginAction: true,
                })
              ),
              catchError((error) =>
                of(
                  loginFailure({ error: error.error?.message || error.message })
                )
              )
            )
        )
      );
    },
    { functional: true }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map((action) => {
          if (action.isLoginAction) {
            this.snackBar.open('Login Successful!', 'Close', {
              duration: 2000,
            });
          }

          localStorage.setItem('authToken', action.token);
          localStorage.setItem('authUser', JSON.stringify(action.user));

          this.store.dispatch(trackTokenExpiration({ token: action.token }));

          if (action.isLoginAction) {
            this.router.navigateByUrl('/posts');
          }
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
                registerSuccess({
                  token: user.token as string,
                  user,
                })
              ),
              catchError((error) =>
                of(
                  registerFailure({
                    error: error.error?.message || error.message,
                  })
                )
              )
            )
        )
      ),
    { functional: true }
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        map((action) => {
          this.snackBar.open('Register Successful!', 'Close', {
            duration: 2000,
          });

          localStorage.setItem('authToken', action.token);
          localStorage.setItem('authUser', JSON.stringify(action.user));

          this.store.dispatch(trackTokenExpiration({ token: action.token }));

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

  trackTokenExpiration$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(trackTokenExpiration),
        switchMap(() => {
          // Check every minute
          return timer(0, 60000).pipe(
            switchMap(
              () =>
                this.store.select(selectExpirationTime) as Observable<number>
            ),
            map((expirationTime: number) => {
              const isTokenExpired =
                expirationTime && Date.now() > expirationTime;

              if (isTokenExpired) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');

                return logout();
              }

              return EMPTY;
            }),
            catchError(() => of(logout()))
          );
        })
      ),
    { dispatch: false, functional: true }
  );

  sendVerificationCode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendVerificationCode),
        switchMap((action) =>
          this.authService.sendVerificationCode({ email: action.email }).pipe(
            map(() => sendVerificationCodeSuccess({ email: action.email })),
            catchError((error) =>
              of(
                sendVerificationCodeFailure({
                  error: error.error?.message || error.message,
                })
              )
            )
          )
        )
      ),
    { functional: true }
  );

  sendVerificationCodeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendVerificationCodeSuccess),
        map((action) => {
          this.snackBar.open('Please Check Your Inbox!', 'Close', {
            duration: 4000,
          });

          this.dialog.open(ForgetPasswordComponent, {
            data: { email: action.email },
          });
        })
      ),
    { dispatch: false, functional: true }
  );

  sendVerificationCodeFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendVerificationCodeFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );

  forgetPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forgetPassword),
        switchMap((action) =>
          this.authService
            .forgetPassword({
              email: action.email,
              verificationCode: action.verificationCode,
              newPassword: action.newPassword,
            })
            .pipe(
              map((user: User) =>
                forgetPasswordSuccess({ token: user.token as string, user })
              ),
              catchError((error) =>
                of(
                  forgetPasswordFailure({
                    error: error.error?.message || error.message,
                  })
                )
              )
            )
        )
      ),
    { functional: true }
  );

  forgetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forgetPasswordSuccess),
        map((action) => {
          this.snackBar.open('Your Password Recovered Successfully!', 'Close', {
            duration: 2000,
          });

          localStorage.setItem('authToken', action.token);
          localStorage.setItem('authUser', JSON.stringify(action.user));

          this.store.dispatch(trackTokenExpiration({ token: action.token }));

          this.router.navigateByUrl('/posts');
        })
      ),
    { dispatch: false, functional: true }
  );

  forgetPasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forgetPasswordFailure),
        map((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false, functional: true }
  );
}
