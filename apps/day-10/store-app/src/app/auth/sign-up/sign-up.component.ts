import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthData } from '../../models/auth-data.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSignUp() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const authData: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.authService.signUp(authData).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      (error: Error) => {
        console.log('Sign up failed.');
        console.log('Error:', error);
        this.isLoading = false;

        this.errorMessage = error.message;
        window.setTimeout(() => {
          this.errorMessage = null;
        }, 4000);

      }
    );
  }

  get Name() {
    return this.form.get('name');
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }
}
