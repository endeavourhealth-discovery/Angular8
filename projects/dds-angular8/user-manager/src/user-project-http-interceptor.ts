import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserManagerService} from './user-manager.service';

@Injectable()
export class UserProjectHttpInterceptor implements HttpInterceptor {
  constructor(private userManagerService: UserManagerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userManagerService.injectProject(request, next);
  }
}
