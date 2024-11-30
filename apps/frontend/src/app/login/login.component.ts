import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { loginValidation } from '@nest-angular-monorepo/validation';
import { login, selectAuthLoading } from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email = new FormControl('', loginValidation.email.angular);
  password = new FormControl('', loginValidation.password.angular);

  formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  isLoading = signal(false);

  constructor(private store: Store) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  ngOnInit() {
    this.store.select(selectAuthLoading).subscribe((isLoading) => {
      this.isLoading.set(isLoading || false);
    });
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set('Password is too short');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  login() {
    if (this.formGroup.invalid) return;

    const email = this.formGroup.get<string>('email')!.value;
    const password = this.formGroup.get<string>('password')!.value;

    this.store.dispatch(login({ email, password }));
  }
}
