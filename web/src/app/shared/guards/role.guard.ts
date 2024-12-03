import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = next.data['expectedRole'];
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}