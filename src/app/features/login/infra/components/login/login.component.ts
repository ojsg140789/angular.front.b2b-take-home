import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginUseCase } from '../../../application/login.usecase';
import { AuthValidationService } from '../../../application/auth-validation.service';
import { AplazoInputComponent } from '@apz/shared-ui/input';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, AplazoInputComponent],
})
export class LoginComponent {
  readonly loginUseCase = inject(LoginUseCase);
  readonly authValidationService = inject(AuthValidationService); // Inyección de AuthValidationService

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

  login(): void {
    const { username, password } = this.form.value;
    this.authValidationService.validateCredentials(username!, password!).subscribe(result => {
      if (!result.valid) {
        this.errorMessage = result.message || 'Credenciales inválidas.';
      } else {
        this.errorMessage = null;
        this.loginUseCase
          .execute({
            username: this.username.value,
            password: this.password.value,
          })
          .subscribe();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
