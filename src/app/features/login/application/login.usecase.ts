import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { Credentials } from '../domain/entities/credentials';
import { AuthService } from '../../../core/services/auth.service'; // Importa AuthService

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
      map((response) => response.token), // Extrae solo el token
      tap((token) => {
        // Guarda el token en localStorage
        localStorage.setItem('authToken', token);
        // Navega a la página de inicio después de autenticarse
        this.router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
      }),
      take(1)
    );
  }
}
