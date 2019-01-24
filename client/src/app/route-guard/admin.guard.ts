import { PayloadDTO } from './../models/payload.dto';
import { CanActivate, Router} from '@angular/router';
import { AppConfig } from '../config/app.config';
import { AuthService } from '../core/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuardService implements CanActivate {
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
        if (this.token !== null && this.token.role === this.appConfig.admin) {
            return true;
        }
        this.router.navigate(['/login']);
    }
}
