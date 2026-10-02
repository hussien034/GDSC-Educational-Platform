import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  feedbackMessage = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) { }

  sendData(): void {
    if (this.loginData.invalid || this.isSubmitting) {
      this.loginData.markAllAsTouched();
      return;
    }

    this.feedbackMessage = '';
    this.isSubmitting = true;
    this.authService.signin(this.loginData.value).subscribe({
      next: response => {
        this.isSubmitting = false;
        if (response.message === 'success') {
          this.router.navigateByUrl('/home');
        } else {
          this.feedbackMessage = response.message;
        }
      },
      error: error => {
        this.isSubmitting = false;
        this.feedbackMessage = error instanceof Error
          ? error.message
          : 'Could not sign in. Please try again.';
      }
    })
  }
}
