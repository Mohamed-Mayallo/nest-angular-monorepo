import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/current-user.decorator';
import { PostsService } from './posts.service';
import { AuthGuard } from '../common/auth.guard';
import {
  CreatePostDto,
  Post as PostEntity,
  User,
} from '@nest-angular-monorepo/types';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  @Inject(PostsService) private postsService: PostsService;

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: 'Get posts' })
  public getPosts(@CurrentUser() user: User): Promise<PostEntity[]> {
    return this.postsService.getPosts(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: 'Create a post' })
  public createPost(
    @CurrentUser() user: User,
    @Body() body: CreatePostDto
  ): Promise<PostEntity> {
    return this.postsService.createPost(user, body);
  }
}
