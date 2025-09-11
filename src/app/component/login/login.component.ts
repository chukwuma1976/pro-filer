import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError: string = '';
  showPassword = false; // Initially hide the password

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        value => {
          if (value.toLowerCase() === "login successful") {
            this.submitted = true;
            this.authService.setIsLoggedIn();
            this.userService.setUserInfo(username);
            this.router.navigate(['/pro-filer/home'])
          } else this.loginError = 'Invalid username or password.'
        }
      );
    }
  }
}
