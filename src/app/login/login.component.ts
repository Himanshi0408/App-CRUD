import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(form: NgForm) {
    const emailInput = this.email.trim();
    const passwordInput = this.password.trim();

    if (!emailInput || !passwordInput) {
      this.message = 'Please enter email and password.';
      return;
    }

    this.userService.login(emailInput, passwordInput).subscribe((users) => {
      if (users.length > 0) {
        this.message = 'Login successful!';
        localStorage.setItem('loggedIn', 'true'); // for route protection
        setTimeout(() => this.router.navigate(['/users']), 1000);
      } else {
        this.message = 'Invalid email or password.';
      }
    });
  }
}
