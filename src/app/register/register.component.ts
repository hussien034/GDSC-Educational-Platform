import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registaration: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12)
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12)
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  feedbackMessage = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) { }

  subRegister(): void {
    if (this.registaration.invalid || this.isSubmitting) {
      this.registaration.markAllAsTouched();
      return;
    }

    this.feedbackMessage = '';
    this.isSubmitting = true;
    this.authService.signup(this.registaration.value).subscribe({
      next: response => {
        this.isSubmitting = false;
        if (response.message === 'success') {
          this.router.navigateByUrl('/login');
        } else {
          this.feedbackMessage = response.message;
        }
      },
      error: error => {
        this.isSubmitting = false;
        this.feedbackMessage = error instanceof Error
          ? error.message
          : 'Could not create your account. Please try again.';
      }
    });
  }
}
