import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AppConfig } from '../config/app.config';
import { ManagerService } from './manager.service';

@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthService,
    JwtHelperService,
    ManagerService
  ],
})
export class CoreModule { }
