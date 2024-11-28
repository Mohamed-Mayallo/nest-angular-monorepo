import { createAction, props } from '@ngrx/store';
import { CreatePostDto, Post } from '@nest-angular-monorepo/types';

export const PostsActions = {
  GET_POSTS: '[Posts] Get Posts',
  GET_POSTS_SUCCESS: '[Posts] Get Posts Success',

  CREATE_POST: '[Posts] Create Post',
  CREATE_POST_SUCCESS: '[Posts] Create Post Success',
};

export const getPosts = createAction(PostsActions.GET_POSTS);

export const getPostsSuccess = createAction(
  PostsActions.GET_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);

export const createPost = createAction(
  PostsActions.CREATE_POST,
  props<CreatePostDto>()
);

export const createPostSuccess = createAction(
  PostsActions.CREATE_POST,
  props<Post>()
);
