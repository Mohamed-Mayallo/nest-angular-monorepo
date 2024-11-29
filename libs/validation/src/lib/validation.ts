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
