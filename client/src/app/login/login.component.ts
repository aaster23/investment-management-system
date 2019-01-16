import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { TokenDTO } from '../models/token.dto';
import { ToastrService } from 'ngx-toastr';

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

    constructor(private formBuilder: FormBuilder,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}
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
            this.auth.login(loginForm.value).subscribe((response: TokenDTO) => {
                localStorage.setItem('access_token', response.token);
            });
        }
    }
}
