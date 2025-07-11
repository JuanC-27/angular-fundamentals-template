import { createAction, props } from '@ngrx/store';
import { UserConstants } from './user.constants';

export interface User {
  name: string;
  email: string;
  role: string;
}

// Request user actions
export const requestUser = createAction(UserConstants.REQUEST_USER);

export const requestUserSuccess = createAction(
  UserConstants.REQUEST_USER_SUCCESS,
  props<{ user: User }>(),
);

export const requestUserFail = createAction(
  UserConstants.REQUEST_USER_FAIL,
  props<{ error: string }>(),
);

// Clear user action
export const clearUser = createAction(UserConstants.CLEAR_USER);
