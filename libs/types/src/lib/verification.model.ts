import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VerificationDocument = HydratedDocument<Verification>;

@Schema()
export class Verification {
  @Prop(String)
  email: string;

  @Prop(String)
  verificationCode: string;

  @Prop(Date)
  expiryDate: Date;

  @Prop(Date)
  createdAt: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
