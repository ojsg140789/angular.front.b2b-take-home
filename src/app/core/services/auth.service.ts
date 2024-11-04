import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7021/api/Auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }
}
