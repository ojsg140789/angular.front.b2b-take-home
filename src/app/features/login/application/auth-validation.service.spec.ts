import { TestBed } from '@angular/core/testing';
import { AuthValidationService } from './auth-validation.service';

describe('AuthValidationService', () => {
  let service: AuthValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return invalid if username is missing', (done) => {
    service.validateCredentials('', 'password').subscribe((result) => {
      expect(result.valid).toBeFalse();
      expect(result.message).toBe('Usuario y contraseña son requeridos.');
      done();
    });
  });

  it('should return invalid if password is missing', (done) => {
    service.validateCredentials('username', '').subscribe((result) => {
      expect(result.valid).toBeFalse();
      expect(result.message).toBe('Usuario y contraseña son requeridos.');
      done();
    });
  });

  it('should return valid if both username and password are provided', (done) => {
    service.validateCredentials('username', 'password').subscribe((result) => {
      expect(result.valid).toBeTrue();
      expect(result.message).toBeUndefined();
      done();
    });
  });
});
