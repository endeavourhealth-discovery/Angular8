import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private snackBar: MatSnackBar) { }

  info(message: string) {
    console.info(message);
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-info', horizontalPosition: 'right'});
  }

  success(message: string) {
    console.log(message);
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-success', horizontalPosition: 'right'});
  }

  error(message: string) {
    console.error(message);
    this.snackBar.open(message, null, {duration: 3000, panelClass: 'logger-error', horizontalPosition: 'right'});
  }

  debug(message: string) {
    console.debug(message);
  }

  trace(message: string) {
    console.trace(message);
  }
}
