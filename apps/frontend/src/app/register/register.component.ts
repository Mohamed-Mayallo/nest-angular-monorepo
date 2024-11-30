import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { registerValidation } from '@nest-angular-monorepo/validation';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { merge } from 'rxjs';
import { Store } from '@ngrx/store';
import { register, selectAuthLoading } from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name = new FormControl('', registerValidation.name.angular);
  email = new FormControl('', registerValidation.email.angular);
  password = new FormControl('', registerValidation.password.angular);

  formGroup = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
  });

  nameErrorMessage = signal('');
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  isLoading = signal(false);

  constructor(private store: Store) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameErrorMessage());

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

  updateNameErrorMessage() {
    if (this.name.hasError('required')) {
      this.nameErrorMessage.set('You must enter a value');
    } else if (this.name.hasError('minlength')) {
      this.nameErrorMessage.set('Name is too short');
    } else {
      this.nameErrorMessage.set('');
    }
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

  register() {
    if (this.formGroup.invalid) return;

    const name = this.formGroup.get<string>('name')!.value;
    const email = this.formGroup.get<string>('email')!.value;
    const password = this.formGroup.get<string>('password')!.value;

    this.store.dispatch(register({ name, email, password }));
  }
}
