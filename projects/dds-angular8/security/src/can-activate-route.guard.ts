import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {UserManagerService} from 'dds-angular8/user-manager';
import {LoggerService} from 'dds-angular8/logger';

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

  private _role: string;
  private _url: string;
  private _unauthorised: boolean = false;

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
        return reject('Not logged in');
      }

      if (!state.url.endsWith('unauthorised')) {
        this._role = route.data.role;
        this._url = state.url;
      }

      this.checkRoleAccess(route.data.role).then(
        (authorised) => resolve(authorised),
        (error) => reject(error)
      );
    });
  }

  checkRoleAccess(role: string): Promise<boolean>  {
    return new Promise((resolve, reject) => {
      this.userManagerService.checkRoleAccess(role).then(
        (authorised) => {
          if (!authorised) {
            this._unauthorised = true;
            this.router.navigate(['/unauthorised']);
          } else if (this._unauthorised) {
            this._unauthorised = false;
            this.router.navigate([this._url]);
          }

          resolve(authorised);
        },
        (error) => reject(error)
      )
    });
  }

  checkCurrentAccess(): Promise<boolean> {
    return this.checkRoleAccess(this._role);
  }
}

