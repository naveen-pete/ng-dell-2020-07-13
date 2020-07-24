import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthData } from '../models/auth-data.model';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';

const TOKEN_EXPIRATION_TIME_IN_SEC = 600;  // 10 minutes

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  private autoLogoutTimer: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(authData: AuthData) {
    return this.http.post<AuthResponseData>(`${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`, authData)
      .pipe(
        catchError(this.handleError),
        tap((authResponseData: AuthResponseData) => {
          this.handleAuthToken(authResponseData);
        })
      );
  }

  login(authData: AuthData) {
    return this.http.post<AuthResponseData>(`${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`, authData)
      .pipe(
        catchError(this.handleError),
        tap((authResponseData: AuthResponseData) => {
          this.handleAuthToken(authResponseData);
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpiryDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const tokenExpiryDate = new Date(userData._tokenExpiryDate);
    const user = new User(
      userData.id,
      userData.email,
      userData._token,
      tokenExpiryDate
    );
    if (user.token) {
      this.user.next(user);

      // start the timer
      const expiryDuration = tokenExpiryDate.getTime() - Date.now();
      this.autoLogout(expiryDuration);
    }
  }

  private autoLogout(expiryDuration: number) {
    this.autoLogoutTimer = window.setTimeout(
      () => {
        this.logout();
      },
      expiryDuration
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.autoLogoutTimer) {
      window.clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }

    this.router.navigate(['/login']);
  }

  private handleAuthToken(authResponseData: AuthResponseData) {
    const { localId, email, idToken, expiresIn } = authResponseData;

    const expiresInMS =
      (expiresIn ? parseInt(expiresIn) : TOKEN_EXPIRATION_TIME_IN_SEC) * 1000;
    const tokenExpiryDate = new Date(Date.now() + expiresInMS);

    const authenticatedUser = new User(localId, email, idToken, tokenExpiryDate);
    localStorage.setItem('userData', JSON.stringify(authenticatedUser));

    // emit an event
    this.user.next(authenticatedUser);

    // start the timer
    this.autoLogout(expiresInMS);
  }

  // NOTE:
  // This error handling is very specific to Firebase API.
  // You will need to implement a similar response within your server-side REST API.
  private handleError(errorResponse: HttpErrorResponse): Observable<Error> {
    const error = new Error('An unknown error occurred.');

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':            // signup error
        error.message = 'The email address is already in use by another account.';
        break;

      case 'EMAIL_NOT_FOUND':         // signup error
        error.message = 'There is no user record corresponding to this email.';
        break;

      case 'INVALID_PASSWORD':        // login error
        error.message = 'The password is invalid or the user does not have a password.';
        break;

      case 'OPERATION_NOT_ALLOWED':   // login error
        error.message = 'Password sign-in is disabled.';
        break;

      case 'USER_DISABLED':
        error.message = 'The user account has been disabled by an administrator.'
        break;
    }

    return throwError(error);
  }

}