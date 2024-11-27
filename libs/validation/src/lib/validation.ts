import { Validators } from '@angular/forms';

export const loginValidation = {
  email: {
    angular: [Validators.required, Validators.email],
    nest: [],
  },
  password: {
    angular: [Validators.required, Validators.minLength(6)],
    nest: [],
  },
};
