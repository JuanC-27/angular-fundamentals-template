import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>('');
  public name$: Observable<string> = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.isLoading$$.next(true);
    return this.userService.getUser().pipe(
      tap((response) => {
        if (response.successful && response.result) {
          this.name$$.next(response.result.name);
          this.isAdmin$$.next(response.result.role === 'admin');
        }
      }),
      finalize(() => this.isLoading$$.next(false)),
    );
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
