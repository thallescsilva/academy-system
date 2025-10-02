import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'] as string[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!this.keycloakService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.keycloakService.hasAnyRole(requiredRoles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}