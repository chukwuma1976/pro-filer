// reset-password.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule
  ]
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token: string = '';
  message = '';
  error = '';
  showPassword = false; // Initially hide the password

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.authService.resetPassword(this.token, this.resetForm.value.newPassword).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.message = res.message;
            setTimeout(() => this.router.navigate(['/login']), 2000);
          } else {
            this.error = res.message;
          }
        },
        error: () => this.error = 'Something went wrong. Please try again later.'
      });
    }
  }
}

