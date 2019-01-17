import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { TokenDTO } from '../models/token.dto';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup;
    private email: AbstractControl;
    private password: AbstractControl;
    private credentialsError: string = null;

    constructor(private formBuilder: FormBuilder,
        private auth: AuthService,

        public snackBar: MatSnackBar,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.email = this.loginForm.get('email');
        this.password = this.loginForm.get('password');
    }

    login(loginForm: NgForm): void {
        if (loginForm.valid) {
            this.auth.login(loginForm.value)
            .subscribe(
                (response: TokenDTO) => {
                localStorage.setItem('access_token', response.token);
                this.credentialsError = null;
                this.auth.getUser();
                this.openSnackBar('Successful login.', 'OK');
                this.router.navigate(['/register']);
            }, (e) => {
                this.openSnackBar('Wrong credentials', 'Failed to login!');
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
}
