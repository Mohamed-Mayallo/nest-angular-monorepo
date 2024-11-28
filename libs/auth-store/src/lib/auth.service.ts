import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginDto, RegisterDto, User } from '@nest-angular-monorepo/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseAuthUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(input: LoginDto): Observable<User> {
    return this.http
      .post<User>(`${this._baseAuthUrl}/login`, input)
      .pipe(map((user) => user));
  }

  register(input: RegisterDto): Observable<User> {
    return this.http
      .post<User>(`${this._baseAuthUrl}/register`, input)
      .pipe(map((user) => user));
  }
}
