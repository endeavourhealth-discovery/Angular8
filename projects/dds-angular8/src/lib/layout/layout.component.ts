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
  pinIcon = 'fa-circle';

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
      let route: Route = routes.find(r => this.routeMatches(menuOption.state, r.path));
      this.routeGuard.checkRoleAccess(route.data.role).then(
        (access) => menuOption.access = access,
        (error) => this.log.error(error)
      );
    }
  }

  routeMatches(state: string, route: string) : boolean {
    const stateParts = state.split('/');
    const routeParts = route.split('/');

    if (routeParts.length !== stateParts.length)
      return false;

    for (let i = 0; i < routeParts.length; i++) {
      const r = routeParts[i];
      const s = stateParts[i];

      if (!r.startsWith(':') && r !== s)
        return null;
    }

    return true;
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
    this.pinIcon = (this.pinned) ? 'fa-dot-circle' : 'fa-circle';
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
    this.userManagerService.getSelectedProject().then(
      (selectedProject) => {
        this.userManagerService.changeDefaultProject(project.id, selectedProject.id).subscribe(
          (ok) => this.getUserProfile(true),
          (error) => this.log.error(error)
        );
      },
      (error) => this.log.error(error)
    );
  }

  getHelp() {
    if (this.router
      && this.router.routerState
      && this.router.routerState.root
      && this.router.routerState.root.firstChild
      && this.router.routerState.root.firstChild.snapshot
      && this.router.routerState.root.firstChild.snapshot.data
      && this.router.routerState.root.firstChild.snapshot.data.helpContext)
      window.open('https://help.discoverydataservice.org/' + this.menuService.getClientId() + '/' + this.router.routerState.root.firstChild.snapshot.data.helpContext, 'Help');
  }
}
