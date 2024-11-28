import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>('/api/auth/login', { email, password })
      .pipe(map((response) => response.token));
  }

  register(name: string, email: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>('/api/auth/register', { name, email, password })
      .pipe(map((response) => response.token));
  }
}
