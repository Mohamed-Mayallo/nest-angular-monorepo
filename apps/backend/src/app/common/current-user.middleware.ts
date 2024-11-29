import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { User } from '@nest-angular-monorepo/types';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async use(req: Request & { user?: User }, _: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token || !token.match(/^Bearer /)) return next();

    const currentUser = await this.getUser(token);
    req.user = currentUser;

    return next();
  }

  private async getUser(token: string) {
    const { id } = this.jwtService.verify(token.replace(/^Bearer /, ''), {
      ...(this.config.getOrThrow('NODE_ENV') === 'development' && {
        ignoreExpiration: true,
      }),
    });

    return await this.userModel.findById(ObjectId.createFromHexString(id));
  }
}
