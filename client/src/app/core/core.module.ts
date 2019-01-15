import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AppConfig } from '../config/app.config';

@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthService
  ],
})
export class CoreModule { }
