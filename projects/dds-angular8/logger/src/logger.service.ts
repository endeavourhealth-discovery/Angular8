import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private snackBar: MatSnackBar) { }

  info(data: any) {
    console.info(this.getText(data));
    this.snackBar.open(this.getText(data), null, {duration: 3000, panelClass: 'logger-info', horizontalPosition: 'right'});
  }

  success(data: any) {
    console.log(this.getText(data));
    this.snackBar.open(this.getText(data), null, {duration: 3000, panelClass: 'logger-success', horizontalPosition: 'right'});
  }

  error(data: any) {
    console.error(this.getText(data));
    this.snackBar.open(this.getText(data), null, {duration: 3000, panelClass: 'logger-error', horizontalPosition: 'right'});
  }

  debug(data: any) {
    console.debug(this.getText(data));
  }

  trace(data: any) {
    console.trace(this.getText(data));
  }

  getText(data: any) {
    if (data.statusText)
      return data.statusText;

    if (data instanceof Object)
      return data.toString();

    return data;
  }
}
