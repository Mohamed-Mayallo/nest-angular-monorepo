import { Post } from '@nest-angular-monorepo/types';
import { createReducer, on } from '@ngrx/store';
import {
  createPost,
  createPostFailure,
  createPostSuccess,
  emptyPosts,
  getPosts,
  getPostsFailure,
  getPostsSuccess,
} from './posts-store.actions';

export interface PostsState {
  isLoading?: boolean;
  error?: string | null;
  posts?: Post[];
}

const initPostsStore: PostsState = {
  error: null,
  isLoading: false,
  posts: [],
};

export const postsReducer = createReducer(
  initPostsStore,

  on(getPosts, (state) => ({ ...state, isLoading: true })),
  on(getPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    error: null,
    isLoading: false,
  })),
  on(getPostsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(createPost, (state) => ({ ...state, isLoading: true })),
  on(createPostSuccess, (state, post) => ({
    ...state,
    posts: [...(state.posts || []), post],
    isLoading: false,
  })),
  on(createPostFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(emptyPosts, (state) => ({
    ...state,
    isLoading: false,
    posts: [],
  }))
);
