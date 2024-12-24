import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.endpoint}/auth`;
  private tokenKey: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          this.tokenKey.next(response.token);
          this.storeToken(response.token);
        }),
        catchError(this.handleError('login', []))
      );
  }

  // Logout method
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Store the token in local storage
  private storeToken(token: string): void {
    localStorage.setItem('tokenKey', token);
  }

  // Remove the token from local storage
  private removeToken(): void {
    this.tokenKey.next(null);
    localStorage.removeItem('tokenKey');
  }

  private getToken(): string | null {
    return this.tokenKey.value;
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
