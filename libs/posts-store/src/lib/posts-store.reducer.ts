import { Post } from '@nest-angular-monorepo/types';
import { createReducer, on } from '@ngrx/store';
import {
  createPost,
  createPostSuccess,
  getPosts,
  getPostsSuccess,
} from './posts-store.actions';

export interface PostsState {
  isLoading: boolean;
  posts: Post[];
}

const initPostsStore: PostsState = {
  isLoading: false,
  posts: [],
};

export const postsReducer = createReducer(
  initPostsStore,

  on(getPosts, (state) => ({ ...state, isLoading: true })),
  on(getPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    isLoading: false,
  })),

  on(createPost, (state) => ({ ...state, isLoading: true })),
  on(createPostSuccess, (state, post) => ({
    ...state,
    posts: [...state.posts, post],
    isLoading: false,
  }))
);
