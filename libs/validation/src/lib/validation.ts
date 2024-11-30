import { Validators } from '@angular/forms';
import { z } from 'zod';

export const loginValidation = {
  email: {
    angular: [Validators.required, Validators.email],
    nest: z.string().email(),
  },
  password: {
    angular: [Validators.required, Validators.minLength(6)],
    nest: z.string().min(6),
  },
};

export const registerValidation = {
  name: {
    angular: [Validators.required, Validators.minLength(1)],
    nest: z.string().min(1),
  },
  email: {
    angular: [Validators.required, Validators.email],
    nest: z.string().email(),
  },
  password: {
    angular: [Validators.required, Validators.minLength(6)],
    nest: z.string().min(6),
  },
};

export const createPostValidation = {
  title: {
    angular: [Validators.required, Validators.minLength(1)],
    nest: z.string().min(1),
  },
  content: {
    angular: [Validators.required],
    nest: z.string(),
  },
};

export const sendVerificationCodeValidation = {
  email: {
    angular: [Validators.required, Validators.email],
    nest: z.string().email(),
  },
};

export const forgetPasswordValidation = {
  email: {
    angular: [Validators.required, Validators.email],
    nest: z.string().email(),
  },
  verificationCode: {
    angular: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ],
    nest: z.string().length(4),
  },
  newPassword: {
    angular: [Validators.required, Validators.minLength(6)],
    nest: z.string().min(6),
  },
};
