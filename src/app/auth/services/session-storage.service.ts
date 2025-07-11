import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  private get window(): Window {
    return this.document.defaultView as Window;
  }

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
