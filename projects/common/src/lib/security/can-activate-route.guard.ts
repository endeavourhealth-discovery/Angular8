import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {UserManagerService} from '../user-manager/user-manager.service';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard extends KeycloakAuthGuard implements CanActivate {
  static secureRoutes(router: Router) {
    let routes : Routes = router.config;
    routes = routes.map(r => { r.canActivate = [CanActivateRouteGuard]; return r;});
    routes.push({path: 'unauthorised', component : AccessDeniedComponent });
    router.resetConfig(routes);
  }

  constructor(protected router: Router,
              protected keycloakAngular: KeycloakService,
              protected userManagerService: UserManagerService,
              protected log: LoggerService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // First check we are logged in
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
          .catch(e => this.log.error(e));
        return reject(false);
      }

      resolve(this.userManagerService.checkRoleAccess(route.data.role, state.url));
    });
  }
}

