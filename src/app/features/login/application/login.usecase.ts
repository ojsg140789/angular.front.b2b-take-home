import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { Credentials } from '../domain/entities/credentials';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  execute(credentials: Credentials): Observable<string> {
    if (!credentials.username) {
      throw new Error('El correo electrónico es requerido');
    }
  
    return this.authService.login(credentials).pipe(
      map((response) => response.token),
      tap((token) => {
        localStorage.setItem('authToken', token);
        this.router.navigate([ROUTE_CONFIG.app.path, ROUTE_CONFIG.home.path]);
      }),
      take(1)
    );
  }
}
