import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginUseCase } from '../../../application/login.usecase';
import { AuthValidationService } from '../../../application/auth-validation.service';
import { AplazoInputComponent } from '@apz/shared-ui/input';
import { AplazoNoWhiteSpaceDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/no-white-space.directive';
import { AplazoLowercaseDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/lower-case-text.directive';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AplazoButtonComponent,
    AplazoLogoComponent,
    AplazoInputComponent,
    AplazoNoWhiteSpaceDirective,
    AplazoLowercaseDirective
  ],
})
export class LoginComponent {
  readonly loginUseCase = inject(LoginUseCase);
  readonly authValidationService = inject(AuthValidationService); // Inyección de AuthValidationService
  readonly router = inject(Router);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  passwordVisible = false;
  errorMessage: string | null = null;
  usernameError: string | null = null;

  login(): void {
    const { username, password } = this.form.value;
    this.authValidationService
      .validateCredentials(username!, password!)
      .subscribe((result) => {
        if (!result.valid) {
          this.errorMessage = result.message || 'Credenciales inválidas.';
        } else {
          this.errorMessage = null;
          this.loginUseCase
            .execute({
              username: this.username.value,
              password: this.password.value,
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/apz/home']);
              },
              error: (error) => {
                this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
                console.error('Login error', error);
              },
            });
        }
      });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onUsernameBlur() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.username.value || '')) {
      this.usernameError = 'El campo debe ser un correo electrónico válido.';
    } else {
      this.usernameError = null;
    }
  }
}
