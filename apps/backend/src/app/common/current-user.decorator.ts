import { User } from '@nest-angular-monorepo/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request: Request & { user?: User } = ctx.switchToHttp().getRequest();

    const currentUser = request.user;
    if (!currentUser) return false;

    return field ? currentUser[field] : currentUser;
  }
);
