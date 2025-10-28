import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    designation: '',
  };

  errors: { [key: string]: string } = {};
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  }

  // Email Validation
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
  }

  //Password Validation
  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return passwordPattern.test(password);
  }

  signup(form: NgForm): void {
    this.errors = {};
    this.successMessage = '';

    // Field Validations
    if (!this.user.firstName.trim()) {
      this.errors['firstName'] = 'First name is required';
    } else if (/\d/.test(this.user.firstName)) {
      this.errors['firstName'] = 'First name cannot contain numbers';
    }

    if (!this.user.lastName.trim()) {
      this.errors['lastName'] = 'Last name is required';
    } else if (/\d/.test(this.user.lastName)) {
      this.errors['lastName'] = 'Last name cannot contain numbers';
    }

    if (!this.user.email.trim()) {
      this.errors['email'] = 'Email is required';
    } else if (!this.validateEmail(this.user.email)) {
      this.errors['email'] = 'Invalid email address';
    }

    if (!this.user.password.trim()) {
      this.errors['password'] = 'Password is required';
    } else if (!this.validatePassword(this.user.password)) {
      this.errors['password'] =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special symbol';
    }

    if (this.user.age < 0) {
      this.errors['age'] = 'Age cannot be negative';
    }

    if (!this.user.designation.trim()) {
      this.errors['designation'] = 'Designation is required';
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    // Check Email Uniqueness
    this.userService.getUsers().subscribe((users) => {
      const exists = users.some((u) => u.email === this.user.email);
      if (exists) {
        this.errors['email'] = 'Email already exists';
      } else {
        this.userService.signup(this.user).subscribe(() => {
          this.successMessage = 'Registration successful! ';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        });
      }
    });
  }
}
