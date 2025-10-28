import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { notAuthGuard } from './guards/not-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [notAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [notAuthGuard] },

  { path: 'users', component: UsersComponent },

  { path: '**', redirectTo: 'login' },
];
