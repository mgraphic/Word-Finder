import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  static readonly DEFAULT_DURATION = 5000;

  private readonly snackBar = inject(MatSnackBar);

  success(
    options: string | { message: string; action?: string; duration?: number },
  ) {
    this.openSnackBar(
      typeof options === 'string'
        ? { message: options, className: 'snackbar-success' }
        : { ...options, className: 'snackbar-success' },
    );
  }

  error(
    options: string | { message: string; action?: string; duration?: number },
  ) {
    this.openSnackBar(
      typeof options === 'string'
        ? { message: options, className: 'snackbar-error' }
        : { ...options, className: 'snackbar-error' },
    );
  }

  private openSnackBar(options: {
    message: string;
    className: string;
    action?: string;
    duration?: number;
  }) {
    const { message, action, duration } = options;

    this.snackBar.open(message, action, {
      duration: duration || ToasterService.DEFAULT_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', options.className],
    });
  }
}
