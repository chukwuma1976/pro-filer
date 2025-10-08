import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [ReactiveFormsModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule]
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.authService.forgotPassword(this.forgotForm.value.username).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.message = res.message;
          } else {
            this.error = res.message;
          }
        },
        error: () => this.error = 'Something went wrong. Please try again later.'
      });
    }
  }
}
