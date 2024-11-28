import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginDto, RegisterDto } from '@nest-angular-monorepo/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(input: LoginDto): Observable<string> {
    return this.http
      .post<{ token: string }>('/api/auth/login', input)
      .pipe(map((response) => response.token));
  }

  register(input: RegisterDto): Observable<string> {
    return this.http
      .post<{ token: string }>('/api/auth/register', input)
      .pipe(map((response) => response.token));
  }
}
