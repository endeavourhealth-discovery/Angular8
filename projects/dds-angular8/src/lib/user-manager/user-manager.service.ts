import {Injectable} from '@angular/core';
import {UserProject} from './models/UserProject';
import {UserProfile} from './models/UserProfile';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Region} from './models/Region';
import {KeycloakService} from 'keycloak-angular';
import {UserOrganisationProject} from './models/UserOrganisationProject';
import {ApplicationPolicyAttribute} from './models/ApplicationPolicyAttribute';
import {AbstractMenuProvider} from '../layout/menuProvider.service';

@Injectable()
export class UserManagerService {
  private readonly _keycloakUserId: string;
  private _userProfile: UserProfile;
  private _userProjects: UserProject[];
  private _selectedProject: UserProject;

  public onProjectChange: ReplaySubject<UserProject> = new ReplaySubject<UserProject>(1);

  constructor(private http: HttpClient,
              private keycloakService: KeycloakService,
              private menuProvider: AbstractMenuProvider) {
    this._keycloakUserId = keycloakService.getKeycloakInstance().idTokenParsed.sub;
  }

  getUserProfile(): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      if (this._userProfile)
        resolve(this._userProfile);
      else {
        this.loadUserProfile().subscribe(
          (profile) => resolve(this._userProfile = profile),
          (error) => reject(error)
        )
      }
    });
  }

  getUserProjects(): Promise<UserProject[]> {
    return new Promise((resolve, reject) => {
      if (this._userProjects)
        resolve(this._userProjects);
      else {
        this.loadUserProjects().subscribe(
          (projects) => {
            this.setUserProjects(projects);
            resolve(projects);
          },
          (error) => reject(error)
        )
      }
    });
  }

  getSelectedProject(): UserProject {
    return this._selectedProject;
  }

  setSelectedProject(newProject: UserProject) {
    this.onProjectChange.next(newProject);
    this._selectedProject = newProject;
  }

  getUserRegion(): Region {
    return this._userProfile.region;
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
        let application = this.menuProvider.getApplicationTitle();

        this.getUserProfile().then(
          () => {
            this.getUserProjects().then(
              () => {
                let org: UserOrganisationProject = this._userProfile.organisationProjects.find(x => x.organisation.uuid == this._selectedProject.organisationId);

                if (org != null) {
                  let attributes: ApplicationPolicyAttribute[] = org.projects.find(y => y.uuid == this._selectedProject.projectId).applicationPolicyAttributes;
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

  logout() {
    this.keycloakService.logout();
  }

  private loadUserProfile(): Observable<UserProfile> {
    const vm = this;
    let params = new HttpParams();
    params = params.append('userId', this._keycloakUserId);
    return vm.http.get<UserProfile>('api/userManager/getUserProfile', {params: params});
  }

  private loadUserProjects(): Observable<UserProject[]> {
    const vm = this;
    let params = new HttpParams();
    params = params.append('userId', this._keycloakUserId);
    return vm.http.get<UserProject[]>('api/userManager/getProjects', {params: params});
  }

  private setUserProjects(projects: UserProject[]) {
    this._userProjects = projects;
    this.setSelectedProject(projects.find(p => p.default));
  }
}
