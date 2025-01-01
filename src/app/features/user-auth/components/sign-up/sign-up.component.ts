import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserCreationDTO } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  registerForm!: FormGroup;
  user!: UserCreationDTO;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.user = this.registerForm.value;

    this.authService.register(this.user).subscribe({
      next: (res) => {
        const token = res.headers.get('x-auth-token'); // Use `headers` instead of `header`
        if (token) {
          this.authService.saveToken(token);
          console.log('Token:', token);
          this.router.navigate(['/']); // Redirect to homepage
        } else {
          console.log('Token not found in response headers');
        }
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });

    console.warn(this.user);
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
