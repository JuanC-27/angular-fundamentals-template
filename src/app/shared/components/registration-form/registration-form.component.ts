import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthStateFacade } from '@app/store/auth/auth.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  public eyeIcon = faEye;
  public eyeSlashIcon = faEyeSlash;
  public loading$ = this.authFacade.isLoading$;
  public errorMessage = '';
  private destroy$ = new Subject<void>();

  registrationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthStateFacade,
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authFacade.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error || '';
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.authFacade.register(this.registrationForm.value);
  }
}
