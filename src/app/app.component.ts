import { Component, OnInit } from '@angular/core';
import { AuthStateFacade } from '@app/store/auth/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthStateFacade) {}

  ngOnInit(): void {
    // Check authentication status on app startup
    this.authFacade.checkAuthStatus();
  }
}
