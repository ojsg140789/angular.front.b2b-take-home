import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { AplazoInputComponent } from '@apz/shared-ui/input';
import { AplazoNoWhiteSpaceDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/no-white-space.directive';
import { AplazoLowercaseDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/lower-case-text.directive';
import { LoginUseCase } from '../../../application/login.usecase';
import { AuthValidationService } from '../../../application/auth-validation.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginUseCaseSpy: jasmine.SpyObj<LoginUseCase>;
  let authValidationServiceSpy: jasmine.SpyObj<AuthValidationService>;

  beforeEach(async () => {
    const loginUseCaseMock = jasmine.createSpyObj('LoginUseCase', ['execute']);
    const authValidationServiceMock = jasmine.createSpyObj(
      'AuthValidationService',
      ['validateCredentials']
    );

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        AplazoButtonComponent,
        AplazoLogoComponent,
        AplazoInputComponent,
        AplazoNoWhiteSpaceDirective,
        AplazoLowercaseDirective,
      ],
      providers: [
        { provide: LoginUseCase, useValue: loginUseCaseMock },
        { provide: AuthValidationService, useValue: authValidationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginUseCaseSpy = TestBed.inject(
      LoginUseCase
    ) as jasmine.SpyObj<LoginUseCase>;
    authValidationServiceSpy = TestBed.inject(
      AuthValidationService
    ) as jasmine.SpyObj<AuthValidationService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form).toBeDefined();
    expect(component.username.value).toBe('');
    expect(component.password.value).toBe('');
  });

  it('should mark form invalid if username or password are empty', () => {
    component.username.setValue('');
    component.password.setValue('');
    expect(component.form.invalid).toBeTrue();
  });

  it('should validate the username as an email format', () => {
    component.username.setValue('invalidEmail');
    component.onUsernameBlur();
    expect(component.usernameError).toBe(
      'El campo debe ser un correo electrónico válido.'
    );

    component.username.setValue('valid@example.com');
    component.onUsernameBlur();
    expect(component.usernameError).toBeNull();
  });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue();
  });
});
