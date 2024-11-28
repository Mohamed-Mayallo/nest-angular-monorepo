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

export interface AuthState {
  token?: string | null;
  error?: string | null;
  isLoading?: boolean;
}

export const initialAuthState: AuthState = {
  token: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({ ...state, isLoading: true, error: null })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
    isLoading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(register, (state) => ({ ...state, isLoading: true, error: null })),
  on(registerSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
    isLoading: false,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(logout, (state) => ({
    ...state,
    token: null,
    error: null,
    isLoading: false,
  }))
);
