import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatSidenavModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  declarations: [
    LayoutComponent
  ],
  entryComponents: [
    LayoutComponent
  ]
})
export class LayoutModule { }
