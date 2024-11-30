import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop(String)
  name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  password: string;

  token?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
