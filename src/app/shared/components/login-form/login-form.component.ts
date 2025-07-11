import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthStateFacade } from '@app/store/auth/auth.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authFacade: AuthStateFacade,
  ) {
    // Subscribe to auth state changes
    this.authFacade.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error || '';
    });
  }

  public eyeIcon = faEye;
  public eyeSlashIcon = faEyeSlash;
  public loading$ = this.authFacade.isLoading$;
  public errorMessage = '';
  private destroy$ = new Subject<void>();

  loginForm: FormGroup = this.fb.group({
    email: ['admin@email.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]],
  });

  submitted = false;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authFacade.login(this.loginForm.value);
  }
}
