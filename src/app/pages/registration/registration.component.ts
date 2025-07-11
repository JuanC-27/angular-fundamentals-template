import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  template: `
    <div class="flex justify-center items-center min-h-svh p-5">
      <app-registration-form />
    </div>
  `,
})
export class RegistrationComponent {
  constructor() {}
}
