import { AppConfig } from './../config/app.config';
import { CanActivate } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Injectable } from '@angular/core';
import { PayloadDTO } from '../models/payload.dto';

@Injectable()
export class ClientGuardService implements CanActivate {
    private token: PayloadDTO;
    constructor(
        private auth: AuthService,
        private appConfig: AppConfig,
    ) {
        this.auth.user.subscribe((token: PayloadDTO) => this.token = token);
    }
    public canActivate(): boolean {
        if (this.token.role === this.appConfig.client) {
            return true;
        }
        return false;
    }
}
