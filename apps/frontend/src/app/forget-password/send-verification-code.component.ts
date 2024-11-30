import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { sendVerificationCodeValidation } from '@nest-angular-monorepo/validation';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { RouterModule } from '@angular/router';
import {
  selectAuthLoading,
  sendVerificationCode,
} from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-send-verification-code',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './send-verification-code.component.html',
  styleUrl: './send-verification-code.component.scss',
})
export class SendVerificationCodeComponent {
  email = new FormControl('', sendVerificationCodeValidation.email.angular);

  emailErrorMessage = signal('');
  isLoading = signal(false);

  constructor(private store: Store) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
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

  sendVerificationCode() {
    if (this.email.invalid) return;

    const email = this.email.value as string;

    this.store.dispatch(sendVerificationCode({ email }));
  }
}
