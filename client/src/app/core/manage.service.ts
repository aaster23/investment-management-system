import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/notification.service';
import { AppConfig } from 'src/app/config/app.config';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Injectable()
export class ManageService {
    constructor(
        private notificationservice: NotificationService,
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public unassignClient(email) {
    if (email) {
      const bearerToken = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/unassign-manager`, { email }, { headers: bearerToken })
        .subscribe((res) => {
          this.notificationservice.openSnackBar(`Successfully unassigned manager from user ${email}`, `Okay`, 'green');
        },
          (err) => {
            this.notificationservice.openSnackBar(`No user with email ${email}`, `Okay`, 'red');
          });
    } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
    }
    this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
  }

  public assignClient(email, manager_email) {
    if (email && manager_email) {
      const bearerToken = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/assign-manager`, { email, manager_email }, { headers: bearerToken })
        .subscribe((res) => {
          this.notificationservice.openSnackBar(`Successfully assigned client ${email} to manager ${manager_email}`, `Okay`, 'green');
        },
          (err) => {
            this.notificationservice.openSnackBar(`No user with email ${email} or ${manager_email} is not a manager`, `Okay`, 'red');
          });
    } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
    }
  }

  public unassignManagerFromUsers(manager_email) {
    if (manager_email) {
      const bearerToken = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/drop-manager`, { manager_email }, { headers: bearerToken })
        .subscribe((res) => {
          this.notificationservice.openSnackBar(`Successfully unassigned manager ${manager_email} from all users`, `Okay`, 'green');
        },
          (err) => {
            this.notificationservice.openSnackBar(`No manager with email: ${manager_email}`, `Okay`, 'red');
          });
    } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
    }
  }
}


// class ManagerDialog {

//   constructor() {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(ManagerOverviewDialog, {
//       width: '250px',
//       data: {name: this.name, animal: this.animal}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//     });
//   }

//   openFromFront(form: string) {

//   }
// }


//  class ManagerOverviewDialog {

//     constructor(
//       public dialogRef: MatDialogRef<ManagerOverviewDialog>,
//       @Inject(MAT_DIALOG_DATA) public data: any) {}

//     onNoClick(): void {
//       this.dialogRef.close();
//     }
//   }
