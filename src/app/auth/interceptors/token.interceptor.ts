import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorageService } from '@auth/services/session-storage.service';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.sessionStorageService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.sessionStorageService.deleteToken();
          this.authService.isAuthorised = false;
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
    );
  }
}
