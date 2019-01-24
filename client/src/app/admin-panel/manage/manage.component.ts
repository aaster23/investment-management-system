import { AppConfig } from './../../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UsersManageModel } from 'src/app/models/users-manage.model';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

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
      public snackBar: MatSnackBar,
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

    private doAction(){
      return 1;
    }
}
