import { Component, OnInit } from '@angular/core';
import { AuthStateFacade } from '@app/store/auth/auth.facade';
import { UserStateFacade } from '@app/store/user/user.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isAuthorized$: Observable<boolean>;
  public name$ = this.userFacade.name$;

  constructor(
    private authFacade: AuthStateFacade,
    private userFacade: UserStateFacade,
  ) {
    this.isAuthorized$ = this.authFacade.isAuthenticated$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authFacade.logout();
    this.userFacade.clearUser();
  }
}
