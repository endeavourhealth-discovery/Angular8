import {Injectable} from '@angular/core';
import {UserProject} from './models/UserProject';
import {UserProfile} from './models/UserProfile';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHandler, HttpParams, HttpRequest} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';
import {UserOrganisationProject} from './models/UserOrganisationProject';
import {ApplicationPolicyAttribute} from './models/ApplicationPolicyAttribute';
import {AbstractMenuProvider} from 'dds-angular8/core';

@Injectable()
export class UserManagerService {
  private readonly _keycloakUserId: string;
  private _userProfilePromise: Promise<UserProfile>;
  private _userProjectsPromise: Promise<UserProject[]>;
  private _selectedProject: UserProject;

  public onProjectChange: ReplaySubject<UserProject> = new ReplaySubject<UserProject>(1);

  constructor(private http: HttpClient,
              private keycloakService: KeycloakService,
              private menuProvider: AbstractMenuProvider) {
    this._keycloakUserId = keycloakService.getKeycloakInstance().idTokenParsed.sub;
  }

  getUserProfile(force: boolean = false): Promise<UserProfile> {
    if (!this._userProfilePromise || force)
      this._userProfilePromise = this.loadUserProfile().toPromise();

    return this._userProfilePromise;
  }

  getUserProjects(force: boolean = false): Promise<UserProject[]> {
    if (!this._userProjectsPromise || force)
      this._userProjectsPromise = this.loadUserProjects().toPromise();

    return this._userProjectsPromise;
  }

  getSelectedProject(): Promise<UserProject> {
    return new Promise<UserProject>((resolve, reject) => {
        if (this._selectedProject)
          resolve(this._selectedProject);
        else {
          // none selected, get default
          this.getUserProjects().then(
            (projects) => {
              let def = projects.find(p => p.default);
              if (def == null && projects.length > 0)
                def = projects[0];
              this.setSelectedProject(def);
              resolve(def);
            },
            (error) => reject(error)
          );
        }
      }
    );
  }

  setSelectedProject(newProject: UserProject) {
    this._userProfilePromise.then(
      (up) => {
        let org : UserOrganisationProject = up.organisationProjects.find(x => x.organisation.uuid == newProject.organisationId);

        // TODO: Handle "org === null" here

        let attributes: ApplicationPolicyAttribute[] = org.projects.find(y => y.uuid == newProject.projectId).applicationPolicyAttributes;
        let appAttributes = attributes.filter(x => x.application == this.menuProvider.getClientId());
        newProject.applicationPolicyAttributes = appAttributes;

        this.onProjectChange.next(newProject);
        this._selectedProject = newProject;
      }
    );

  }

  changeDefaultProject(defaultProject: string, userProjectId: string): Observable<string> {
    const vm = this;
    let params = new HttpParams();
    params = params.append('userId', this._keycloakUserId);
    params = params.append('defaultProjectId', defaultProject);
    params = params.append('userProjectId', userProjectId);
    return vm.http.get('api/userManager/setDefaultProject', {params: params, responseType: 'text'});
  }

  checkRoleAccess(role : string) : Promise<boolean>  {
    return new Promise((resolve, reject) => {
      if (role == null || role == '')
        resolve(true);
      else {
        let authorised = false;
        let application = this.menuProvider.getClientId();

        this.getUserProfile().then(
          (up) => {
            this.getSelectedProject().then(
              (selected) => {
                let org: UserOrganisationProject = up.organisationProjects.find(x => x.organisation.uuid == selected.organisationId);

                if (org != null) {
                  let attributes: ApplicationPolicyAttribute[] = org.projects.find(y => y.uuid == selected.projectId).applicationPolicyAttributes;
                  if (attributes != null) {
                    let appAttributes = attributes.filter(x => x.application == application);
                    if (appAttributes != null)
                      authorised = appAttributes.find(x => x.applicationAccessProfileName == role) != null;
                  }
                }
                resolve(authorised);
              },
              (error) => reject(error)
            )
          },
          (error) => reject(error)
        );
      }
    });
  }

  injectProject(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._selectedProject && this._selectedProject.projectId) {
      request = request.clone({
        setHeaders: {
          userProjectId: this._selectedProject.id
        }
      });
    }

    return next.handle(request);
  }

  logout() {
    this.keycloakService.logout();
  }

  private loadUserProfile(): Observable<UserProfile> {
    const vm = this;
    let params = new HttpParams();
    params = params.append('userId', this._keycloakUserId);
    return vm.http
      .get<UserProfile>('api/userManager/getUserProfile', {params: params});
  }

  private loadUserProjects(): Observable<UserProject[]> {
    const vm = this;
    let params = new HttpParams();
    params = params.append('userId', this._keycloakUserId);
    return vm.http
      .get<UserProject[]>('api/userManager/getProjects', {params: params});
  }
}
