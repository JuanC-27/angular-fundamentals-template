import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserStateFacade } from '@app/store/user/user.facade';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userFacade: UserStateFacade,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userFacade.isAdmin$.pipe(
      take(1),
      map((isAdmin) => {
        if (isAdmin) {
          return true;
        }
        // Redirect to courses page if not admin
        return this.router.createUrlTree(['/courses']);
      }),
    );
  }
}
