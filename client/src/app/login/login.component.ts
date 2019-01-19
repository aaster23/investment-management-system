import { LoginDTO } from './../models/user-login.dto';
import { AppConfig } from './../config/app.config';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { TokenDTO } from '../models/token.dto';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../core/user.service';
import { UserInfoDTO } from '../models/userInfo.dto';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private email: AbstractControl;
  private password: AbstractControl;
  private credentialsError: string = null;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UsersService,
    private router: Router,
    private appConfig: AppConfig,
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
      this.auth.login(loginForm.value).subscribe((response: TokenDTO) => {
        localStorage.setItem('access_token', response.token);
        this.credentialsError = null;
        const payload: any = this.auth.decodeToken();
        if (payload.role === this.appConfig.admin) {
          this.router.navigate(['/register']);
        }
        if (payload.role === this.appConfig.manager) {
          const email = { email: payload.email };
          this.userService.retrieveUserData(email).subscribe(
            (managerData: UserInfoDTO) => {
              localStorage.setItem('id', managerData.id);
            }
          );
          this.router.navigate(['/manager']);
        }
        this.userService.openSnackBar('Successful login.', 'OK');
      }, (e) => {
        this.userService.openSnackBar('Wrong credentials', 'Failed to login!');
      });
    }
  }
  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
      return 'The field is required';
    }
  }
}
