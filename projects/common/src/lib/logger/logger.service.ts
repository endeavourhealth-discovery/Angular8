import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private snackBar: MatSnackBar) { }

  info(message: string) {
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-info', horizontalPosition: 'right'});
  }

  success(message: string) {
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-success', horizontalPosition: 'right'});
  }

  error(message: string) {
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-error', horizontalPosition: 'right'});
  }

  debug(message: string) {
    console.log(message);
  }

  trace(message: string) {
    console.log(message);
  }
}
