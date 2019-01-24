import { UsersHttpService } from './../core/user.http.service';
import { AppConfig } from './../config/app.config';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { TokenDTO } from '../models/token.dto';
import { Router } from '@angular/router';
import { UserInfoDTO } from '../models/userInfo.dto';
import { NotificationService } from '../core/notification.service';

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
    private usersServiceHttp: UsersHttpService,
    private router: Router,
    private appConfig: AppConfig,
    private notificationService: NotificationService,
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
          this.usersServiceHttp.retrieveManagerData(email).subscribe(
            (managerData: UserInfoDTO) => {
              localStorage.setItem('id', managerData.id);
            }
          );
          this.router.navigate(['/manager']);
        }
        this.notificationService.openSnackBar('Successful login.', 'OK', 'green');
      }, (e) => {
        this.notificationService.openSnackBar('Wrong credentials', 'Failed to login!', 'red');
      });
    }
  }
  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
      return 'The field is required';
    }
  }
}
