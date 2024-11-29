import { createAction, props } from '@ngrx/store';
import { CreatePostDto, Post } from '@nest-angular-monorepo/types';

export const PostsActions = {
  GET_POSTS: '[Posts] Get Posts',
  GET_POSTS_SUCCESS: '[Posts] Get Posts Success',
  GET_POSTS_FAILURE: '[Posts] Get Posts Failure',

  CREATE_POST: '[Posts] Create Post',
  CREATE_POST_SUCCESS: '[Posts] Create Post Success',
  CREATE_POST_FAILURE: '[Posts] Create Post Failure',

  EMPTY_POSTS: '[Posts] Empty Posts',
};

export const getPosts = createAction(PostsActions.GET_POSTS);

export const getPostsSuccess = createAction(
  PostsActions.GET_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);

export const getPostsFailure = createAction(
  PostsActions.GET_POSTS_FAILURE,
  props<{ error: string; statusCode?: number }>()
);

export const createPost = createAction(
  PostsActions.CREATE_POST,
  props<CreatePostDto>()
);

export const createPostSuccess = createAction(
  PostsActions.CREATE_POST_SUCCESS,
  props<Post>()
);

export const createPostFailure = createAction(
  PostsActions.CREATE_POST_FAILURE,
  props<{ error: string; statusCode?: number }>()
);

export const emptyPosts = createAction(PostsActions.EMPTY_POSTS);
