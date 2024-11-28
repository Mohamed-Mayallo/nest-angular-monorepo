import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, User } from '@nest-angular-monorepo/types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthService;

  @Post('/register')
  @ApiOperation({ summary: 'Register operation' })
  public register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  // @Get('/me')
  // @UseGuards(AuthGuard)
  // @ValidateUser()
  // @ApiOperation({ summary: 'Get current user details from token' })
  // @ApiRes(User)
  // @ApiBearerAuth('authorization')
  // public me(@CurrentUser() user: User): Promise<User> {
  //   return this.meService.me(user);
  // }

  @Post('/login')
  @ApiOperation({ summary: 'Login operation' })
  public login(@Body() body: LoginDto): Promise<User> {
    return this.authService.login(body);
  }
}
