import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((response) => {
            if (response.successful && response.result) {
              return AuthActions.loginSuccess({
                token: response.result,
                user: response.user,
              });
            } else {
              return AuthActions.loginFail({ error: 'Login failed' });
            }
          }),
          catchError((error) =>
            of(AuthActions.loginFail({ error: error.message || 'Login failed' })),
          ),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/courses']);
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFail({ error: error.message || 'Logout failed' })),
          ),
        ),
      ),
    ),
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(action.userData).pipe(
          map((response) => {
            if (response.successful) {
              return AuthActions.registerSuccess({ message: 'Registration successful' });
            } else {
              return AuthActions.registerFail({ error: 'Registration failed' });
            }
          }),
          catchError((error) =>
            of(AuthActions.registerFail({ error: error.message || 'Registration failed' })),
          ),
        ),
      ),
    ),
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthStatus),
      map(() => {
        const token = this.sessionStorageService.getToken();
        if (token) {
          return AuthActions.loginSuccess({ token, user: null });
        } else {
          return AuthActions.logoutSuccess();
        }
      }),
    ),
  );
}
