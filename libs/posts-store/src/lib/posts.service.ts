import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, map, mergeMap, of } from 'rxjs';
import { CreatePostDto, Post, User } from '@nest-angular-monorepo/types';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '@nest-angular-monorepo/auth-store';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _baseAuthUrl = 'http://34.71.100.200/api/posts';

  constructor(private http: HttpClient, private store: Store) {}

  getPosts(): Observable<Post[]> {
    return this.store.select(selectAuthenticatedUser).pipe(
      mergeMap((user: User | null | undefined) => {
        if (!user) return of([]);

        return this.http
          .get<Post[]>(`${this._baseAuthUrl}/`, {
            headers: { Authorization: user.token! },
          })
          .pipe(map((posts) => posts));
      })
    );
  }

  createPost(input: CreatePostDto): Observable<Post> {
    return this.store.select(selectAuthenticatedUser).pipe(
      mergeMap((user: User | null | undefined) => {
        if (!user) return EMPTY;

        return this.http
          .post<Post>(`${this._baseAuthUrl}/`, input, {
            headers: { Authorization: user.token! },
          })
          .pipe(map((post) => post));
      })
    );
  }
}
