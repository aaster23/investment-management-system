import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material';

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
    public snackBar: MatSnackBar,
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
  this.password = this.registerForm.get('amount');
  this.selectedRole = 'client';
  this.registerForm.controls.password.disable();
  }

  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
        return 'The field is required';
    }
}

private openSnackBar(message: string, action: string, color: string): void {
    this.snackBar.open(message, action, {
        duration: 3500,
        panelClass: [`${color}-snackbar`],
    });
}

private register() {
    if (!this.registerForm.valid) {
        this.openSnackBar(`Please fill all of the fields!`, 'Okay', 'red');
        return;
    }
    const email = this.registerForm.controls.email.value;
    const fullname = this.registerForm.controls.name.value;
    const password = this.registerForm.controls.password.value;
    const amount = this.registerForm.controls.amount.value;
    if (this.selectedRole === 'admin' || this.selectedRole === 'manager') {
        this.auth.register({ fullname, email, password }, this.selectedRole).subscribe((res) => {
            this.openSnackBar(`Successfully registered ${this.selectedRole} ${fullname} with ${email}`, 'Okay', 'green');
        }, (e) => {
            console.log(e);
            this.openSnackBar(`The email is already registered!`, 'Okay', 'red');
        });
    } else if (this.selectedRole === 'client') {
        this.auth.register({ fullname, email, amount }, 'client').subscribe((res) => {
            this.openSnackBar(`Successfully registered manager ${fullname} with ${email}`, 'Okay', 'green');
        }, (e) => {
            console.log(e);
            this.openSnackBar(`The email is already registered!`, 'Okay', 'red');
        });
    }
}
private selectedButton(event) {
  if (event.value === '0') {
      this.registerForm.controls.amount.setValue('');
      this.registerForm.controls.amount.disable();

      this.registerForm.controls.password.enable();
      this.selectedRole = 'admin';
      console.log();
  } else if (event.value === '1') {
      this.registerForm.controls.amount.setValue('');
      this.registerForm.controls.amount.disable();

      this.registerForm.controls.password.enable();
      this.selectedRole = 'manager';
  } else if (event.value === '2') {
      this.selectedRole = 'client';
      this.registerForm.controls.amount.enable();

      this.registerForm.controls.password.setValue('');
      this.registerForm.controls.password.disable();
  }
}
}
