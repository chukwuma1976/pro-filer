import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule]
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
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const { username, password, email } = this.signupForm.value;
      this.authService.signup(username, password, email).subscribe(
        value => {
          if (value === "User registered") {
            this.authService.login(username, password);
            this.authService.setIsLoggedIn();
            this.router.navigate(['/pro-filer/home'])
          }
          else this.signupError = 'Signup failed. username may already be in use.';
        }
      );
    }
  }
}
