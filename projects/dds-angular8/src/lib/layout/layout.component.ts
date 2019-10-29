import {Component, HostBinding, OnInit} from '@angular/core';
import {AbstractMenuProvider} from './menuProvider.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MenuOption} from './models/MenuOption';
import {Route, Router} from '@angular/router';
import {CanActivateRouteGuard} from '../security/can-activate-route.guard';
import {UserProfile} from '../user-manager/models/UserProfile';
import {UserProject} from '../user-manager/models/UserProject';
import {UserManagerService} from '../user-manager/user-manager.service';
import {LoggerService} from '../logger/logger.service';

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
  user: UserProfile;
  userProjects: UserProject[];
  currentProject: UserProject;

  menuItems: MenuOption[] = [];

  constructor(private menuService: AbstractMenuProvider,
              private userManagerService: UserManagerService,
              private router: Router,
              public overlayContainer: OverlayContainer,
              private routeGuard: CanActivateRouteGuard,
              private log: LoggerService) {
  }

  ngOnInit() {
    CanActivateRouteGuard.secureRoutes(this.router);
    this.title = this.menuService.getApplicationTitle();
    this.menuItems = this.menuService.getMenuOptions();
    this.setMenuOptionAccess();

    this.getUserProfile();

    this.userManagerService.onProjectChange.subscribe(
      (newProject) => this.onProjectChange(newProject),
      (error) => this.log.error(error)
    );
  }

  setMenuOptionAccess() {
    let routes: Route[] = this.router.config;
    for (let menuOption of this.menuItems) {
      let route = routes.find(r => r.path == menuOption.state);
      this.routeGuard.checkRoleAccess(route.data.role).then(
        (access) => menuOption.access = access,
        (error) => this.log.error(error)
      );
    }
  }

  onProjectChange(project: UserProject) {
    this.currentProject = project;
    this.routeGuard.checkCurrentAccess();
    this.setMenuOptionAccess();
  }

  getUserProfile(force: boolean = false) {
    this.userManagerService.getUserProfile(force)
      .then(
        (profile) => this.setUserProfile(profile, force),
        (error) => this.log.error(error)
      );
  }

  setUserProfile(profile: UserProfile, force: boolean = false) {
    this.user = profile;
    this.userManagerService.getUserProjects(force)
      .then(
        (projects) => this.userProjects = projects,
        (error) => this.log.error(error)
      )
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
    this.userManagerService.logout();
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  switchProject(project: UserProject) {
    this.userManagerService.setSelectedProject(project);
  }

  setDefault(project: UserProject) {
    this.userManagerService.changeDefaultProject(project.id, this.userManagerService.getSelectedProject().id).subscribe(
      (ok) => this.getUserProfile(true),
      (error) => this.log.error(error)
    );
  }
}
