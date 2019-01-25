import { AppConfig } from './../../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatPaginator, MatDividerModule, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UsersManageModel } from 'src/app/models/users-manage.model';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
@Injectable()
export class ManageComponent implements OnInit {
    private manageForm: FormGroup;

    private userEmail: AbstractControl;
    private managerEmail: AbstractControl;

    private selectedForm: string;
    private credentialsError: string = null;

    constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      private notificationservice: NotificationService,
      private http: HttpClient,
      private appConfig: AppConfig,
      ) {}

    ngOnInit() {
      this.manageForm = this.formBuilder.group({
        userEmail: ['', Validators.pattern('.+\@.+\..+')],
        managerEmail: ['', Validators.pattern('.+\@.+\..+')],
      });
      this.userEmail = this.manageForm.get('userEmail');
      this.managerEmail = this.manageForm.get('managerEmail');
    }

    private validate(inputField: AbstractControl): string {
      if (inputField.hasError('required')) {
          return 'The field is required';
      }
    }

    private unassignManager() {
      const email = this.manageForm.controls.userEmail.value;
      if (email) {
        const bearerToken = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/unassign-manager`, {email}, { headers: bearerToken })
      .subscribe((res) => {
        this.notificationservice.openSnackBar(`Successfully unassigned manager from user ${email}`, `Okay`, 'green')},
        (err) => {
          this.notificationservice.openSnackBar(`No user with email ${email}`, `Okay`, 'red');
        });
      } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
      }
    }

    private assignClient() {
      const email = this.manageForm.controls.userEmail.value;
      const manager_email = this.manageForm.controls.managerEmail.value;

      if (email && manager_email) {
        const bearerToken = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/assign-manager`, {email, manager_email}, { headers: bearerToken })
      .subscribe((res) => {
        this.notificationservice.openSnackBar(`Successfully assigned manager ${manager_email} to user ${email}`, `Okay`, 'green')},
        (err) => {
          this.notificationservice.openSnackBar(`No user with email ${email} or ${manager_email} is not a manager`, `Okay`, 'red');
        });
      } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
      }
    }

    private unassignManagerFromUsers() {
      const manager_email = this.manageForm.controls.managerEmail.value;

      if (manager_email) {
        const bearerToken = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access_token')
      });
      this.http.post(`${this.appConfig.apiUrl}/users/drop-manager`, {manager_email}, { headers: bearerToken })
      .subscribe((res) => {
        this.notificationservice.openSnackBar(`Successfully unassigned manager ${manager_email} from all users`, `Okay`, 'green')},
        (err) => {
          this.notificationservice.openSnackBar(`No manager with email: ${manager_email}`, `Okay`, 'red');
        });
      } else {
      this.notificationservice.openSnackBar(`Fill the forms properly!`, `Okay`, 'red');
      }
    }
}
