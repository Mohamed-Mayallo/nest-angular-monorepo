import { createAction, props } from '@ngrx/store';

export const AuthActions = {
  AUTH_LOGIN: '[Auth] Login',
  AUTH_LOGIN_SUCCESS: '[Auth] Login Success',
  AUTH_LOGIN_FAILURE: '[Auth] Login Failure',

  AUTH_LOGOUT: '[Auth] Logout',

  AUTH_REGISTER: '[Auth] Register',
  AUTH_REGISTER_SUCCESS: '[Auth] Register Success',
  AUTH_REGISTER_FAILURE: '[Auth] Register Failure',
};

export const login = createAction(
  AuthActions.AUTH_LOGIN,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  AuthActions.AUTH_LOGIN_SUCCESS,
  props<{ token: string }>()
);

export const loginFailure = createAction(
  AuthActions.AUTH_LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(AuthActions.AUTH_LOGOUT);

export const register = createAction(
  AuthActions.AUTH_REGISTER,
  props<{ name: string; email: string; password: string }>()
);

export const registerSuccess = createAction(
  AuthActions.AUTH_REGISTER_SUCCESS,
  props<{ token: string }>()
);

export const registerFailure = createAction(
  AuthActions.AUTH_REGISTER_FAILURE,
  props<{ error: string }>()
);
