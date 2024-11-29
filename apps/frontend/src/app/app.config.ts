import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer, AuthEffects } from '@nest-angular-monorepo/auth-store';
import { PostsEffects, postsReducer } from '@nest-angular-monorepo/posts-store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth: authReducer, posts: postsReducer }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects([AuthEffects, PostsEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
