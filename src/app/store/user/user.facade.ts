import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from './user.reducer';
import { User } from './user.actions';
import {
  selectUser,
  selectUserName,
  selectIsAdmin,
  selectUserLoading,
  selectUserError,
} from './user.selectors';
import * as UserActions from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserStateFacade {
  // Observable properties
  public user$: Observable<User | null> = this.store.pipe(select(selectUser));
  public name$: Observable<string> = this.store.pipe(select(selectUserName));
  public isAdmin$: Observable<boolean> = this.store.pipe(select(selectIsAdmin));
  public isLoading$: Observable<boolean> = this.store.pipe(select(selectUserLoading));
  public error$: Observable<string | null> = this.store.pipe(select(selectUserError));

  constructor(private store: Store<UserState>) {}

  // Action dispatching methods
  getUser(): void {
    this.store.dispatch(UserActions.requestUser());
  }

  clearUser(): void {
    this.store.dispatch(UserActions.clearUser());
  }
}
