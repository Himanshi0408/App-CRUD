import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  designation: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Protect page: redirect if not logged in
    if (!localStorage.getItem('loggedIn')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUsers();
  }

  /** Load all users from server */
  loadUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => (this.users = data),
      error: (error) => console.error('Error loading users', error),
    });
  }

  
  onEdit(user: User): void {
    this.selectedUser = { ...user }; // Clone to avoid direct table edit
  }

  

onSaveChanges(): void {
 if (!this.selectedUser || !this.selectedUser.id) return;
  
 
  //  Check if age is negative or zero (assuming age must be > 0)
  if (this.selectedUser.age <= 0) {
      alert('Age must be a positive number.'); 
      return; 
  }
  

const { email, ...userData } = this.selectedUser;
 this.http
 .put<User>(`${this.apiUrl}/${this.selectedUser.id}`, userData)
 .subscribe({
 next: () => {
 this.loadUsers();
this.selectedUser = null;
 },
error: (err) => console.error('Error updating user', err),
 });
}

  
  onCancel(): void {
    this.selectedUser = null;
  }

  
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user', err),
      });
    }
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
