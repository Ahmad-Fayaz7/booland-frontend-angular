import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const userCredentials = this.loginForm.value;

    this.authService.login(userCredentials).subscribe({
      next: (res) => {
        const token = res;
        this.authService.saveToken(token);
        this.router.navigate(['/']);
        console.log('Token:', token);
      },
      error: (err) => {
        console.error('Error occurred:', err); // Log the full error object for inspection
        console.log('Error message:', err.message); // Log just the error message (if available)
        console.log('Error details:', JSON.stringify(err, null, 2)); // Stringify the error object for easier reading
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
