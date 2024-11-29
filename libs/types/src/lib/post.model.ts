import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.model';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop(String)
  title: string;

  @Prop(String)
  content: number;

  @Prop(Date)
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
