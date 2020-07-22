import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../models/auth-data.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(authData: AuthData) { }

  login(authData: AuthData) { }
}