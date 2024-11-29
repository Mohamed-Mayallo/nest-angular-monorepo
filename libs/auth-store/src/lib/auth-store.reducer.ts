import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  loginFailure,
  logout,
  login,
  register,
  registerSuccess,
  registerFailure,
} from './auth-store.actions';
import { User } from '@nest-angular-monorepo/types';

export interface AuthState {
  token?: string | null;
  error?: string | null;
  user?: User | null;
  isLoading?: boolean;
}

export const initialAuthState: AuthState = {
  token: null,
  error: null,
  user: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({ ...state, isLoading: true, error: null })),
  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null,
    isLoading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(register, (state) => ({ ...state, isLoading: true, error: null })),
  on(registerSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null,
    isLoading: false,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(logout, (state) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');

    return {
      ...state,
      token: null,
      error: null,
      user: null,
      isLoading: false,
    };
  })
);
