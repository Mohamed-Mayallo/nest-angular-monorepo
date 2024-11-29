import { LoginDto, RegisterDto, User } from '@nest-angular-monorepo/types';
import { createAction, props } from '@ngrx/store';

export const AuthActions = {
  AUTH_LOGIN: '[Auth] Login',
  AUTH_LOGIN_SUCCESS: '[Auth] Login Success',
  AUTH_LOGIN_FAILURE: '[Auth] Login Failure',

  AUTH_LOGOUT: '[Auth] Logout',

  AUTH_REGISTER: '[Auth] Register',
  AUTH_REGISTER_SUCCESS: '[Auth] Register Success',
  AUTH_REGISTER_FAILURE: '[Auth] Register Failure',

  AUTH_TRACK_TOKEN_EXP: '[Auth] Track Token Expiration',
};

export const login = createAction(AuthActions.AUTH_LOGIN, props<LoginDto>());

export const loginSuccess = createAction(
  AuthActions.AUTH_LOGIN_SUCCESS,
  props<{ token: string; user: User; isLoginAction?: boolean }>()
);

export const loginFailure = createAction(
  AuthActions.AUTH_LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(AuthActions.AUTH_LOGOUT);

export const register = createAction(
  AuthActions.AUTH_REGISTER,
  props<RegisterDto>()
);

export const registerSuccess = createAction(
  AuthActions.AUTH_REGISTER_SUCCESS,
  props<{ token: string; user: User }>()
);

export const registerFailure = createAction(
  AuthActions.AUTH_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const trackTokenExpiration = createAction(
  AuthActions.AUTH_TRACK_TOKEN_EXP,
  props<{ token: string }>()
);
