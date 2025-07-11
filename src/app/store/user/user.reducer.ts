import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  // Request User
  on(UserActions.requestUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(UserActions.requestUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
  })),

  on(UserActions.requestUserFail, (state, { error }) => ({
    ...state,
    user: null,
    isLoading: false,
    error,
  })),

  // Clear User
  on(UserActions.clearUser, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
);

export const reducer = (state: UserState, action: Action): UserState => userReducer(state, action);
