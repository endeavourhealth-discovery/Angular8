import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageBoxDialogComponent} from './message-box-dialog/message-box-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    MessageBoxDialogComponent
  ],
  exports: [
    MessageBoxDialogComponent
  ],
  entryComponents: [
    MessageBoxDialogComponent
  ]
})
export class DialogsModule { }
