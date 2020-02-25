import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatWrapperComponent} from './mat-wrapper/mat-wrapper.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HelpButtonComponent} from './help-button/help-button.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
  MatWrapperComponent,
    HelpButtonComponent
],
  exports: [
    MatWrapperComponent,
    HelpButtonComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class ControlsModule { }
