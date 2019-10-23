import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanActivateRouteGuard} from './can-activate-route.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    CanActivateRouteGuard
  ],
  declarations: [AccessDeniedComponent],
  entryComponents: [AccessDeniedComponent]
})
export class SecurityModule { }
