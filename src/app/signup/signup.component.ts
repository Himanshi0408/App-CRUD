import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    designation: ''
  };

  message: string = '';
  messageType: 'success' | 'error' = 'error';

  constructor(private userService: UserService, private router: Router) {}

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    // Minimum 8 characters, at least one uppercase letter
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  }

  signup(): void {
    if (!this.validateEmail(this.user.email)) {
      this.message = 'Please enter a valid email address!';
      this.messageType = 'error';
      return;
    }

    if (!this.validatePassword(this.user.password)) {
      this.message = 'Password must be at least 8 characters long and include at least one uppercase letter!';
      this.messageType = 'error';
      return;
    }

    if (this.user.age < 0) {
      this.message = 'Age cannot be negative!';
      this.messageType = 'error';
      return;
    }

    this.userService.getUsers().subscribe(users => {
      const exists = users.some(u => u.email === this.user.email);
      if (exists) {
        this.message = 'Email already exists!';
        this.messageType = 'error';
      } else {
        this.userService.signup(this.user).subscribe(() => {
          this.message = 'Registration successful!';
          this.messageType = 'success';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        });
      }
    });
  }
}
