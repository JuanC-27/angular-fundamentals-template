import { createAction, props } from '@ngrx/store';
import { AuthConstants } from './auth.constants';
import { LoginRequest, RegisterRequest, AuthResponse } from '@app/interfaces/auth.interface';

// Login actions
export const login = createAction(AuthConstants.LOGIN, props<{ credentials: LoginRequest }>());

export const loginSuccess = createAction(
  AuthConstants.LOGIN_SUCCESS,
  props<{ token: string; user?: any }>(),
);

export const loginFail = createAction(AuthConstants.LOGIN_FAIL, props<{ error: string }>());

// Logout actions
export const logout = createAction(AuthConstants.LOGOUT);

export const logoutSuccess = createAction(AuthConstants.LOGOUT_SUCCESS);

export const logoutFail = createAction(AuthConstants.LOGOUT_FAIL, props<{ error: string }>());

// Register actions
export const register = createAction(
  AuthConstants.REGISTER,
  props<{ userData: RegisterRequest }>(),
);

export const registerSuccess = createAction(
  AuthConstants.REGISTER_SUCCESS,
  props<{ message: string }>(),
);

export const registerFail = createAction(AuthConstants.REGISTER_FAIL, props<{ error: string }>());

// Check auth status
export const checkAuthStatus = createAction(AuthConstants.CHECK_AUTH);
