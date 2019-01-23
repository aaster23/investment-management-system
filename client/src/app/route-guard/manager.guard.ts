import { CanActivate } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { AuthService } from '../core/auth.service';
import { Injectable } from '@angular/core';
import { PayloadDTO } from '../models/payload.dto';

@Injectable()
export class ManagerGuardService implements CanActivate {
    private token: PayloadDTO;
    constructor(
        private auth: AuthService,
        private appConfig: AppConfig,
    ) {
        this.auth.getUser();
        this.auth.user.subscribe((token: PayloadDTO) => this.token = token);
    }
    public canActivate(): boolean {
        if (this.token !== null && this.token.role === this.appConfig.manager) {
            return true;
        }
        return false;
    }
}
