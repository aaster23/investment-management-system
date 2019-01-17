import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { ToastrService } from 'ngx-toastr';
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

    constructor(private formBuilder: FormBuilder,
        private auth: AuthService,
        private toastr: ToastrService,
        public snackBar: MatSnackBar,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            amount: ['', Validators.required],
            name: ['', Validators.required],
        });

        this.email = this.registerForm.get('email');
        this.password = this.registerForm.get('password');
        this.name = this.registerForm.get('name');
        this.password = this.registerForm.get('amount');
    }


    private login(registerForm: NgForm): void {
        if (registerForm.valid) {
            this.auth.login(registerForm.value).subscribe(
                // (res: IAccessToken) => {
                //     localStorage.setItem('access_token', res.token);
                //     this.credentialsError = null;
                //     this.auth.getUser();
                //     this.openSnackBar('Successful login.', 'OK');
                //     this.router.navigate(['/project/all']);
                //     // this.router.navigate(['/', this.user.company]);
                // },
                (err: HttpErrorResponse) => {
                    this.credentialsError = err.error.err;
                    this.auth.getUser();
                });
        }
    }

    private validate(inputField: AbstractControl): string {
        if (inputField.hasError('required')) {
            return 'The field is required';
        }
    }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
    private logout() {
        this.auth.logout();
    }
}
