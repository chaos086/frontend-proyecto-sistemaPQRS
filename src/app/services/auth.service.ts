import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import type { LoginRequest, TokenResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.setSession(res))
    );
  }

  private setSession(token: TokenResponse): void {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('tokenType', token.tokenType);
    localStorage.setItem('expiresInSeconds', String(token.expiresInSeconds));
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresInSeconds');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
