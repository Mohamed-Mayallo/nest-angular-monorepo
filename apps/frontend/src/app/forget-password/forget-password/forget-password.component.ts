import { Component, inject, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { forgetPasswordValidation } from '@nest-angular-monorepo/validation';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  forgetPassword,
  selectAuthLoading,
} from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  dialogRef = inject(MatDialogRef<ForgetPasswordComponent>);

  newPassword = new FormControl(
    '',
    forgetPasswordValidation.newPassword.angular
  );
  verificationCode = new FormControl(
    '',
    forgetPasswordValidation.verificationCode.angular
  );

  formGroup = new FormGroup({
    newPassword: this.newPassword,
    verificationCode: this.verificationCode,
  });

  newPasswordErrorMessage = signal('');
  verificationCodeErrorMessage = signal('');
  isLoading = signal(false);

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public dialogData: { email: string }
  ) {
    merge(this.newPassword.statusChanges, this.newPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNewPasswordErrorMessage());

    merge(
      this.verificationCode.statusChanges,
      this.verificationCode.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateVerificationCodeErrorMessage());
  }

  ngOnInit() {
    this.store.select(selectAuthLoading).subscribe((isLoading) => {
      this.isLoading.set(isLoading || false);
    });
  }

  updateNewPasswordErrorMessage() {
    if (this.newPassword.hasError('required')) {
      this.newPasswordErrorMessage.set('You must enter a value');
    } else if (this.newPassword.hasError('minlength')) {
      this.newPasswordErrorMessage.set('Password is too short');
    } else {
      this.newPasswordErrorMessage.set('');
    }
  }

  updateVerificationCodeErrorMessage() {
    if (this.verificationCode.hasError('required')) {
      this.verificationCodeErrorMessage.set('You must enter a value');
    } else if (
      this.verificationCode.hasError('minlength') ||
      this.verificationCode.hasError('maxlength')
    ) {
      this.verificationCodeErrorMessage.set('Code must be 4 characters');
    } else {
      this.verificationCodeErrorMessage.set('');
    }
  }

  forgetPassword() {
    if (this.formGroup.invalid) return;

    const email = this.dialogData.email;
    const newPassword = this.formGroup.get<string>('newPassword')!.value;
    const verificationCode =
      this.formGroup.get<string>('verificationCode')!.value;

    this.store.dispatch(
      forgetPassword({ email, newPassword, verificationCode })
    );

    this.dialogRef.close();
  }
}
