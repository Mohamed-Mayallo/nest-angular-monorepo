import { Model } from 'mongoose';
import { CreatePostDto, Post, User } from '@nest-angular-monorepo/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  public async getPosts(author: User): Promise<Post[]> {
    return await this.postModel.find({ author: author._id });
  }

  public async createPost(author: User, input: CreatePostDto): Promise<Post> {
    const post = await this.postModel.create({
        title: input.title,
        content: input.content,
        author,
      }),
      postDoc = post.toJSON();

    return postDoc;
  }
}
