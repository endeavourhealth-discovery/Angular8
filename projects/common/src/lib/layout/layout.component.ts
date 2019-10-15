import {Component, HostBinding, OnInit} from '@angular/core';
import {AbstractMenuProvider} from './menuProvider.service';
import {KeycloakService} from 'keycloak-angular';
import {OverlayContainer} from '@angular/cdk/overlay';
import {KeycloakProfile} from 'keycloak-js';
import {MenuOption} from './models/MenuOption';
import {Router} from '@angular/router';
import {CanActivateRouteGuard} from '../security/can-activate-route.guard';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @HostBinding('class') componentCssClass;

  open = false;
  pinned = false;
  pinIcon = 'radio_button_unchecked';

  title = '';
  avatar = 'assets/avatar.png';
  user: KeycloakProfile;

  menuItems: MenuOption[] = [];

  constructor(private menuService: AbstractMenuProvider,
              private keycloak: KeycloakService,
              private router: Router,
              public overlayContainer: OverlayContainer) { }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuOptions();
    this.title = this.menuService.getApplicationTitle();
    CanActivateRouteGuard.secureRoutes(this.router);
    this.keycloak.loadUserProfile()
      .then(
        (result) => this.user = result,
        (error) => console.error(error)
      );
  }

  expand() {
    this.open = true;
  }

  collapse() {
    this.open = false;
  }

  togglePin() {
    this.pinned = !this.pinned;
    this.pinIcon = (this.pinned) ? 'radio_button_checked' : 'radio_button_unchecked';
  }

  logout() {
    this.keycloak.logout();
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
