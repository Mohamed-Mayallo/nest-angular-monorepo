import * as argon from 'argon2';
import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import {
  ForgetPasswordDto,
  LoginDto,
  RegisterDto,
  SendVerificationCodeDto,
  User,
  Verification,
} from '@nest-angular-monorepo/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Verification.name)
    private verificationModel: Model<Verification>
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
        password: await this.hashPass(input.password),
      }),
      userDoc = user.toJSON();
    delete userDoc.password;

    return { ...userDoc, token: await this.generateJwtToken(user) };
  }

  public async sendVerificationCode(
    input: SendVerificationCodeDto
  ): Promise<void> {
    await this.deleteOldVerificationCodes(input.email);

    await this.getUserByEmailOrThrow(input.email);

    await this.shareCode(input.email);
  }

  public async forgetPassword(input: ForgetPasswordDto): Promise<User> {
    const verification = await this.verificationModel
      .findOne({
        email: input.email.toLowerCase(),
        verificationCode: input.verificationCode,
      })
      .sort('-createdAt');

    this.validateVerificationCode(verification);

    const user = await this.getUserByEmailOrThrow(input.email);
    user.password = await this.hashPass(input.newPassword);
    await user.save();

    const userDoc = user.toJSON();
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

  private async hashPass(password: string) {
    return await argon.hash(password);
  }

  private async generateJwtToken(user: User) {
    const token = await this.jwtService.signAsync({ id: user._id });
    return `Bearer ${token}`;
  }

  private async deleteOldVerificationCodes(email: string) {
    await this.verificationModel.deleteMany({ email: email.toLowerCase() });
  }

  private async shareCode(email: string) {
    const verificationCode = '1234',
      expiryDateAfterOneHour = new Date(Date.now() + 3600000);

    const verification = await this.verificationModel.create({
      email: email.toLowerCase(),
      verificationCode,
      expiryDate: expiryDateAfterOneHour,
    });
    await verification.save();

    // Send actual email including this verification code
  }

  private validateVerificationCode(verification: Verification) {
    if (!verification) {
      throw new ConflictException('This verification code does not exist!');
    }

    if (verification.expiryDate < new Date()) {
      throw new ConflictException('This verification code already expired!');
    }
  }
}
