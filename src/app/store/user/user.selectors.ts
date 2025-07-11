import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducer';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

// User selectors
export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);

export const selectUserName = createSelector(
  selectUserState,
  (state: UserState) => state.user?.name || '',
);

export const selectIsAdmin = createSelector(
  selectUserState,
  (state: UserState) => state.user?.role === 'admin',
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isLoading,
);

export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);
