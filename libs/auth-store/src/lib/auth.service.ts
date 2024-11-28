import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginDto, RegisterDto } from '@nest-angular-monorepo/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseAuthUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(input: LoginDto): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this._baseAuthUrl}/login`, input)
      .pipe(map((response) => response.token));
  }

  register(input: RegisterDto): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this._baseAuthUrl}/register`, input)
      .pipe(map((response) => response.token));
  }
}
