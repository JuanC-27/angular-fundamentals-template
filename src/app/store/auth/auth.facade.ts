import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from './auth.reducer';
import { LoginRequest, RegisterRequest } from '@app/interfaces/auth.interface';
import {
  selectIsAuthenticated,
  selectAuthToken,
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
} from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  // Observable properties
  public isAuthenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  public token$: Observable<string | null> = this.store.pipe(select(selectAuthToken));
  public user$: Observable<any> = this.store.pipe(select(selectAuthUser));
  public isLoading$: Observable<boolean> = this.store.pipe(select(selectAuthLoading));
  public error$: Observable<string | null> = this.store.pipe(select(selectAuthError));

  constructor(private store: Store<AuthState>) {}

  // Action dispatching methods
  login(credentials: LoginRequest): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  register(userData: RegisterRequest): void {
    this.store.dispatch(AuthActions.register({ userData }));
  }

  checkAuthStatus(): void {
    this.store.dispatch(AuthActions.checkAuthStatus());
  }
}
