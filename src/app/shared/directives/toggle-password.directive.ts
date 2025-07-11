import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword',
})
export class TogglePasswordDirective {
  private _isPassword = true;

  @HostBinding('attr.type') get type() {
    return this._isPassword ? 'password' : 'text';
  }

  get isPassword() {
    return this._isPassword;
  }

  toggle() {
    this._isPassword = !this._isPassword;
  }
}
