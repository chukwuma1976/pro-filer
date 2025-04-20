import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  signupError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const { email, username, password } = this.signupForm.value;
      this.authService.signup(email, username, password).subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.signupError = 'Signup failed. username may already be in use.'
      });
    }
  }
}
