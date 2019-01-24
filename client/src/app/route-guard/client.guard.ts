import { AppConfig } from './../config/app.config';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Injectable } from '@angular/core';
import { PayloadDTO } from '../models/payload.dto';

@Injectable()
export class ClientGuardService implements CanActivate {
    private token: PayloadDTO;
    constructor(
        private auth: AuthService,
        private appConfig: AppConfig,
        private router: Router,
    ) {
        this.auth.getUser();
        this.auth.user.subscribe((token: PayloadDTO) => this.token = token);
    }
    public canActivate(): boolean {
        if (this.token.role === this.appConfig.client) {
            return true;
        }
        this.router.navigate(['/login']);
    }
}
