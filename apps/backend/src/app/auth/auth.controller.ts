import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, User } from '@nest-angular-monorepo/types';

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
}
