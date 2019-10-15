import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {AbstractMenuProvider} from '../layout/menuProvider.service';
import {AccessDeniedComponent} from './access-denied/access-denied.component';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard extends KeycloakAuthGuard implements CanActivate {
  static secureRoutes(router: Router) {
    console.log('Securing routes...');
    let routes : Routes = router.config;
    routes = routes.map(r => { r.canActivate = [CanActivateRouteGuard]; return r;});
    routes.push({path: 'unauthorised', component : AccessDeniedComponent });
    router.resetConfig(routes);
  }

  constructor(protected router: Router,
              protected keycloakAngular: KeycloakService,
              protected menuProvider: AbstractMenuProvider) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // First check we are logged in
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
          .catch(e => console.error(e));
        return reject(false);
      }

      // Get the roles required
      const requiredRoles: string[] = route.data.roles;

      // Check the users roles
      if (this.menuProvider.useUserManagerForRoles())
        return this.checkUserManagerRoles(resolve, requiredRoles);
      else
        return this.checkKeycloakRoles(resolve, requiredRoles);
    });
  }

  private checkUserManagerRoles(resolve, requiredRoles) {
    // TODO: Check user manager for roles
    return this.checkRoles(resolve, requiredRoles, []);
  }

  private checkKeycloakRoles(resolve, requiredRoles) {
    return this.checkRoles(resolve, requiredRoles, this.keycloakAngular.getUserRoles());
  }

  private checkRoles(resolve, requiredRoles, userRoles) {
    let allowed = false;
    if (!requiredRoles || requiredRoles.length === 0) {
      allowed = true;
    } else {
      if (!userRoles || userRoles.length === 0) {
        allowed = false;
      } else {
        allowed = requiredRoles.every(role => userRoles.indexOf(role) > -1);
      }
    }

    if (!allowed)
      this.router.navigate(['/unauthorised']);

    return resolve(allowed);
  }
}

