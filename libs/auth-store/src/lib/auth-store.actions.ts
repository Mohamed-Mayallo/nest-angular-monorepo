import {
  ForgetPasswordDto,
  LoginDto,
  RegisterDto,
  SendVerificationCodeDto,
  User,
} from '@nest-angular-monorepo/types';
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

  AUTH_SEND_VERIFICATION_CODE: '[Auth] Send Verification Code',
  AUTH_SEND_VERIFICATION_CODE_SUCCESS: '[Auth] Send Verification Code Success',
  AUTH_SEND_VERIFICATION_CODE_FAILURE: '[Auth] Send Verification Code Failure',

  AUTH_FORGET_PASSWORD: '[Auth] Forget Password',
  AUTH_FORGET_PASSWORD_SUCCESS: '[Auth] Forget Password Success',
  AUTH_FORGET_PASSWORD_FAILURE: '[Auth] Forget Password Failure',
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

export const sendVerificationCode = createAction(
  AuthActions.AUTH_SEND_VERIFICATION_CODE,
  props<SendVerificationCodeDto>()
);

export const sendVerificationCodeSuccess = createAction(
  AuthActions.AUTH_SEND_VERIFICATION_CODE_SUCCESS,
  props<{ email: string }>()
);

export const sendVerificationCodeFailure = createAction(
  AuthActions.AUTH_SEND_VERIFICATION_CODE_FAILURE,
  props<{ error: string }>()
);

export const forgetPassword = createAction(
  AuthActions.AUTH_FORGET_PASSWORD,
  props<ForgetPasswordDto>()
);

export const forgetPasswordSuccess = createAction(
  AuthActions.AUTH_FORGET_PASSWORD_SUCCESS,
  props<{ token: string; user: User }>()
);

export const forgetPasswordFailure = createAction(
  AuthActions.AUTH_FORGET_PASSWORD_FAILURE,
  props<{ error: string }>()
);
