import * as argon from 'argon2';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto, User } from '@nest-angular-monorepo/types';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  public async login(input: LoginDto): Promise<User> {
    const user = await this.getUserByEmailOrThrow(input.email);

    await this.passwordMustBeMatched(user.password, input.password);

    const userDoc = user.toJSON();
    delete userDoc.password;

    return { ...userDoc, token: await this.generateJwtToken(user) };
  }

  public async register(input: RegisterDto): Promise<User> {
    await this.userMustNotBeDuplicated(input.email);

    const user = await this.userModel.create({
        name: input.name,
        email: input.email.toLowerCase(),
        password: await this.hasPass(input.password),
      }),
      userDoc = user.toJSON();
    delete userDoc.password;

    return { ...userDoc, token: await this.generateJwtToken(user) };
  }

  private async userMustNotBeDuplicated(email: string) {
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new ConflictException('User already exists!');
    }
  }

  private async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    return user;
  }

  private async getUserByEmailOrThrow(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new ConflictException('User does not exist!');
    }
    return user;
  }

  private async passwordMustBeMatched(hash: string, password: string) {
    const isPassMatched = await argon.verify(hash, password);
    if (!isPassMatched) {
      throw new ConflictException('Password is wrong!');
    }
  }

  private async hasPass(password: string) {
    return await argon.hash(password);
  }

  private async generateJwtToken(user: User) {
    const token = await this.jwtService.signAsync({ id: user._id });
    return `Bearer ${token}`;
  }
}
