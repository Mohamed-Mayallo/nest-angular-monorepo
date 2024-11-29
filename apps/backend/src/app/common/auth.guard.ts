import { Request } from 'express';
import { User } from '@nest-angular-monorepo/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: User } = context
      .switchToHttp()
      .getRequest();

    const currentUser = request.user as User;
    if (!currentUser) {
      throw new UnauthorizedException('Unauthenticated!');
    }

    return true;
  }
}
