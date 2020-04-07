import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenericTableSspComponent} from './generic-table-ssp/generic-table-ssp.component';
import {GenericTableComponent} from './generic-table/generic-table.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule,
  MatDialogModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatTabsModule,
  MatTreeModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from 'keycloak-angular';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
  GenericTableSspComponent,
  GenericTableComponent
],
  exports: [
  GenericTableComponent,
  GenericTableSspComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    CoreModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTabsModule,
    MatBadgeModule,
    FlexModule
  ]
})
export class GenericTableModule { }
