import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    isAuthenticated: true,
    token,
    user,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFail, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.logoutFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.registerFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Check auth status
  on(AuthActions.checkAuthStatus, (state) => ({
    ...state,
    isLoading: false,
  })),
);

export const reducer = (state: AuthState, action: Action): AuthState => authReducer(state, action);
