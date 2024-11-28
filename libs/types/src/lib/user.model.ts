import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(String)
  id: string;

  @Prop(String)
  name: string;

  @Prop(String)
  email: number;

  @Prop(String)
  password: string;

  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
