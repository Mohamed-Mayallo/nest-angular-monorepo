import { jwtDecode } from 'jwt-decode';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-store.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.token
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthenticatedUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectExpirationTime = createSelector(
  selectAuthState,
  (state: AuthState) => {
    if (!state.token) return;

    return (jwtDecode(state.token)?.exp || 1) * 1000;
  }
);
