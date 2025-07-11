import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

// Auth selectors
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated,
);

export const selectAuthToken = createSelector(selectAuthState, (state: AuthState) => state.token);

export const selectAuthUser = createSelector(selectAuthState, (state: AuthState) => state.user);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading,
);

export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);
