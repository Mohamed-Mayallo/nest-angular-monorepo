import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop(String)
  _id: string;

  @Prop(String)
  title: string;

  @Prop(String)
  content: number;

  @Prop(Date)
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
