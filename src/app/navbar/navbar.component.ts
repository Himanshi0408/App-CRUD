
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
