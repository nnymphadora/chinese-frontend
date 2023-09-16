import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MatSnackbarService {
  openSnackBar(
    message: string,
    action?: string,
    panelClasses?: string[],
    duration?: number,
    horizontalPosition?: MatSnackBarHorizontalPosition,
    verticalPosition?: MatSnackBarVerticalPosition
  ) {
    const config: MatSnackBarConfig = {};
    if (duration) {
      config.duration = duration;
    }
    if (panelClasses) {
      config.panelClass = panelClasses;
    }
    if (horizontalPosition) {
      config.horizontalPosition = horizontalPosition;
    }

    if (verticalPosition) {
      config.verticalPosition = verticalPosition;
    }
    this.snackBar.open(message, action || undefined, config);
  }
  constructor(private snackBar: MatSnackBar) {}
}
