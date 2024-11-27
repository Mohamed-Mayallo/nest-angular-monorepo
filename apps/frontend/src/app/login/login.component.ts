import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { loginValidation } from '@nest-angular-monorepo/validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly email = new FormControl('', loginValidation.email.angular);
  readonly password = new FormControl('', loginValidation.password.angular);

  readonly formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
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
    console.log(this.formGroup.value);

    if (this.formGroup.invalid) return;
  }
}
