import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts-store.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectsPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state.posts
);

export const selectIsLoadingState = createSelector(
  selectPostsState,
  (state: PostsState) => state.isLoading
);
