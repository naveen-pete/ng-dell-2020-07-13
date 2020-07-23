import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthData } from '../models/auth-data.model';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

const TOKEN_EXPIRATION_TIME_IN_SEC = 600;  // 10 minutes

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private http: HttpClient) { }

  signUp(authData: AuthData) {
    return this.http.post<AuthResponseData>(`${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`, authData)
      .pipe(
        tap((authResponseData) => {
          const { localId, email, idToken, expiresIn } = authResponseData;

          const expiresInMS =
            (expiresIn ? parseInt(expiresIn) : TOKEN_EXPIRATION_TIME_IN_SEC) * 1000;
          const tokenExpiryDate = new Date(Date.now() + expiresInMS);

          this.user = new User(localId, email, idToken, tokenExpiryDate);

          console.log('authResponseData:', authResponseData);
          console.log('user:', this.user);
        })
      );
  }

  login(authData: AuthData) {
    return this.http.post<AuthResponseData>(`${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`, authData);
  }
}