import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgetPasswordDto,
  LoginDto,
  RegisterDto,
  SendVerificationCodeDto,
  User,
} from '@nest-angular-monorepo/types';

@Controller('auth')
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthService;

  @Post('/register')
  public register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('/login')
  public login(@Body() body: LoginDto): Promise<User> {
    return this.authService.login(body);
  }

  @Post('/send-verification-code')
  public sendVerificationCode(
    @Body() body: SendVerificationCodeDto
  ): Promise<void> {
    return this.authService.sendVerificationCode(body);
  }

  @Patch('/forget-password')
  public forgetPassword(@Body() body: ForgetPasswordDto): Promise<User> {
    return this.authService.forgetPassword(body);
  }
}
