import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials and store token', () => {
    const result = service.login('admin', 'admin');

    expect(result).toBe(true);
    expect(localStorage.getItem('portfolio-token')).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/portfolio']);
  });

  it('should reject invalid credentials', () => {
    const result = service.login('wrong', 'password');

    expect(result).toBe(false);
    expect(localStorage.getItem('portfolio-token')).toBeFalsy();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should return true when authenticated with valid token', () => {
    localStorage.setItem('portfolio-token', 'mock-token');

    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should logout and clear token', () => {
    localStorage.setItem('portfolio-token', 'mock-token');

    service.logout();

    expect(localStorage.getItem('portfolio-token')).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return stored token', () => {
    const mockToken = 'test-token-123';
    localStorage.setItem('portfolio-token', mockToken);

    expect(service.getToken()).toBe(mockToken);
  });

  it('should return null when no token exists', () => {
    expect(service.getToken()).toBe(null);
  });
});
