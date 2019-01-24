import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-admin-panel-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private email: AbstractControl;
  private password: AbstractControl;
  private amount: AbstractControl;
  private name: AbstractControl;
  private credentialsError: string = null;
  private selectedRole: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private notificationservice: NotificationService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.pattern('.+\@.+\..+')],
      password: ['', Validators.pattern('[A-z0-9]{6,}')],
      amount: ['', Validators.required],
      name: ['', Validators.required],
  });

  this.email = this.registerForm.get('email');
  this.password = this.registerForm.get('password');
  this.name = this.registerForm.get('name');
  this.amount = this.registerForm.get('amount');
  this.selectedRole = 'client';
  }

    private validate(inputField: AbstractControl): string {
            if (inputField.hasError('required')) {
                return 'The field is required';
            }
    }


    private register() {
        if (!this.registerForm.valid) {
            this.notificationservice.openSnackBar(`Please fill all of the fields!`, 'Okay', 'red');
            return;
        }
        const email = this.registerForm.controls.email.value;
        const fullname = this.registerForm.controls.name.value;
        const password = this.registerForm.controls.password.value;
        const amount = this.registerForm.controls.amount.value;
        if (this.selectedRole === 'admin' || this.selectedRole === 'manager') {
            this.auth.register({ fullname, email, password }, this.selectedRole).subscribe((res) => {
                // tslint:disable-next-line:max-line-length
                this.notificationservice.openSnackBar(`Successfully registered ${this.selectedRole} ${fullname} with ${email}`, 'Okay', 'green');
            }, (e) => {
                this.notificationservice.openSnackBar(`The email is already registered!`, 'Okay', 'red');
            });
        } else if (this.selectedRole === 'client') {
            this.auth.register({ fullname, email, amount }, 'client').subscribe((res) => {
                this.notificationservice.openSnackBar(`Successfully registered manager ${fullname} with ${email}`, 'Okay', 'green');
            }, (e) => {
                this.notificationservice.openSnackBar(`The email is already registered!`, 'Okay', 'red');
            });
        }
    }

    private isSelectedRole(): boolean {
        if (this.selectedRole === 'admin' || this.selectedRole === 'manager') {
            this.amount.disable();
            this.password.enable();
            return true;
        }
        this.amount.enable();
        this.password.disable();
        return false;
    }

    private selectedButtonRole(role: string): void {
        this.selectedRole = role;
    }
}
