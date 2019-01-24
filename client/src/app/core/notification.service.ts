import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
    constructor(
        private snackBar: MatSnackBar,
    ) { }
    public openSnackBar(message: string, action: string, color: string): void {
        this.snackBar.open(message, action, {
            duration: 2500,
            panelClass: [`${color}-snackbar`],
        });
    }
}
