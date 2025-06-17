import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Static credentials
    if (username === 'samad' && password === '123') {
      // Generate mock JWT token
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('portfolio-token', mockToken);
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/portfolio']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('portfolio-token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return localStorage.getItem('portfolio-token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('portfolio-token');
  }
}
