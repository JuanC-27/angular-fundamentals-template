import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex justify-center items-center min-h-svh p-5">
      <app-login-form></app-login-form>
    </div>
  `,
})
export class LoginComponent {
  constructor() {}
}
