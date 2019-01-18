import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    private registerForm: FormGroup;
    private email: AbstractControl;
    private password: AbstractControl;
    private amount: AbstractControl;
    private name: AbstractControl;
    private credentialsError: string = null;
    private selectedForm: string;

    constructor(private formBuilder: FormBuilder,
        private auth: AuthService,
        public snackBar: MatSnackBar,
        private router: Router,
    ) { }
    ngOnInit(): void {
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
        this.selectedForm = 'client';
        this.registerForm.controls.password.disable();
    }


    private login(registerForm: NgForm): void {
        if (registerForm.valid) {
            // this.auth.login(registerForm.value).subscribe(
                // (res: IAccessToken) => {
                //     localStorage.setItem('access_token', res.token);
                //     this.credentialsError = null;
                //     this.auth.getUser();
                //     this.openSnackBar('Successful login.', 'OK');
                //     this.router.navigate(['/project/all']);
                //     // this.router.navigate(['/', this.user.company]);
                // },
                // (err: HttpErrorResponse) => {
                //     this.credentialsError = err.error.err;
                //     this.auth.getUser();
                // });
        }
    }

    private validate(inputField: AbstractControl): string {
        if (inputField.hasError('required')) {
            return 'The field is required';
        }
    }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3500,
            panelClass: ['blue-snackbar'],
        });
    }
    private logout() {
        this.auth.logout();
    }

    private register() {
        if (!this.registerForm.valid) {
            this.openSnackBar(`Please fill all of the fields!`, 'Okay');
            return;
        }
        const email = this.registerForm.controls.email.value;
        const fullname = this.registerForm.controls.name.value;
        const password = this.registerForm.controls.password.value;
        const amount = this.registerForm.controls.amount.value;
        if (this.selectedForm === 'admin' || this.selectedForm === 'manager') {
            this.auth.register({ fullname, email, password }, this.selectedForm).subscribe((res) => {
                this.openSnackBar(`Successfully registered ${this.selectedForm} ${fullname} with ${email}`, 'Okay');
            }, (e) => {
                console.log(e);
                this.openSnackBar(`The email is already registered!`, 'Okay');
            });
        } else if (this.selectedForm === 'client') {
            this.auth.register({ fullname, email, amount }, 'client').subscribe((res) => {
                this.openSnackBar(`Successfully registered manager ${fullname} with ${email}`, 'Okay');
            }, (e) => {
                console.log(e);
                this.openSnackBar(`The email is already registered!`, 'Okay');
            });
        }
    }

    private selectedButton(event) {
        if (event.value === '0') {
            this.registerForm.controls.amount.setValue('');
            this.registerForm.controls.amount.disable();

            this.registerForm.controls.password.enable();
            this.selectedForm = 'admin';
            console.log();
        } else if (event.value === '1') {
            this.registerForm.controls.amount.setValue('');
            this.registerForm.controls.amount.disable();

            this.registerForm.controls.password.enable();
            this.selectedForm = 'manager';
        } else if (event.value === '2') {
            this.selectedForm = 'client';
            this.registerForm.controls.amount.enable();

            this.registerForm.controls.password.setValue('');
            this.registerForm.controls.password.disable();
        }
    }
}
