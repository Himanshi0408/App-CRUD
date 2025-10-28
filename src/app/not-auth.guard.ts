import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loggedIn = !!localStorage.getItem('loggedIn');

  if (loggedIn) {
    alert('You are already logged in Please logout first.');
    router.navigate(['/users']);
    return false;
  }
  return true;
};
