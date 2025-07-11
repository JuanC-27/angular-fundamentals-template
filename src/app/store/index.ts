import { ActionReducerMap } from '@ngrx/store';
import { CoursesState, coursesReducer } from './courses/courses.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
import { UserState, userReducer } from './user/user.reducer';
import { CoursesEffects } from './courses/courses.effects';
import { AuthEffects } from './auth/auth.effects';
import { UserEffects } from './user/user.effects';

export interface State {
  courses: CoursesState;
  auth: AuthState;
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
  auth: authReducer,
  user: userReducer,
};

export const effects = [CoursesEffects, AuthEffects, UserEffects];
