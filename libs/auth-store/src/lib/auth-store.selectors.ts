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
