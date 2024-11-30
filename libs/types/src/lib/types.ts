export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
}

export class SendVerificationCodeDto {
  email: string;
}

export class ForgetPasswordDto {
  newPassword: string;
  verificationCode: string;
  email: string;
}
