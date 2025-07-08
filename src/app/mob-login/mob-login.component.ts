import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { InPlayService } from '../services/inplay.service';

@Component({
  selector: 'app-mob-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mob-login.component.html',
  styleUrl: './mob-login.component.css',
})
export class MobLoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string = '';
  validCodeFromServer: string = '';
  showPassword = false;
  generated = false;
  userId = '';
  pass = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private inPlayService: InPlayService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      pass: ['', Validators.required],
      validCode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });
  }
  ngOnInit() {
    this.generateRandomCode();
  }

  generateRandomCode() {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    this.validCodeFromServer = randomCode;
    console.log('Generated Code:', this.validCodeFromServer);
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }

    const { userId, pass, validCode } = this.loginForm.value;

    if (validCode !== this.validCodeFromServer) {
      this.errorMsg = 'Invalid validation code.';
      this.generateRandomCode();
      return;
    }

    this.inPlayService.validateLogin(userId, pass).subscribe({
      next: (res: {
        type: string;
        message: string;
        password: string;
        userid: any;
      }) => {
        console.log('Validation Code Response:', res);

        if (res.type === 'error') {
          this.errorMsg = res.message || 'Invalid Credentials.';
          return;
        }

        if (res.password && res.userid === userId) {
          this.authService.storeToken(res.password);
          // localStorage.setItem('token', res.password)
          // localStorage.setItem('Auth', res.password);

          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        } else {
          this.errorMsg = 'Login failed. Invalid credentials.';
        }
      },

      error: (err: any) => {
        this.errorMsg = 'Login failed. Try again.';
        console.error('Login error:', err);
      },
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
