import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  ForgetPasswordDto,
  LoginDto,
  RegisterDto,
  SendVerificationCodeDto,
  User,
} from '@nest-angular-monorepo/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseAuthUrl = 'http://34.71.100.200/api/auth';

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

  sendVerificationCode(input: SendVerificationCodeDto): Observable<void> {
    return this.http.post<void>(
      `${this._baseAuthUrl}/send-verification-code`,
      input
    );
  }

  forgetPassword(input: ForgetPasswordDto): Observable<User> {
    return this.http
      .patch<User>(`${this._baseAuthUrl}/forget-password`, input)
      .pipe(map((user) => user));
  }
}
