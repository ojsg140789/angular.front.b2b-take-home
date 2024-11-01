import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {
  
  validateCredentials(username: string, password: string): Observable<{ valid: boolean; message?: string }> {
    if (!username || !password) {
      return of({ valid: false, message: 'Usuario y contraseña son requeridos.' });
    }

    return of({ valid: true });
  }
}
