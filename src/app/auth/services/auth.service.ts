import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { SessionStorageService } from './session-storage.service';
import { LoginRequest, AuthResponse, RegisterRequest } from '@app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthorized$$ = new BehaviorSubject<boolean>(!!this.sessionStorageService.getToken());
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        if (response.successful && response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorised = true;
        }
      }),
    );
  }

  logout(): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorised = false;
        this.router.navigate(['/login']);
      }),
    );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}
