// import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { LoginDTO } from '../models/user-login.dto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    public user = new BehaviorSubject<object>({});
    public isAuth = new BehaviorSubject<boolean>(false);

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
        private router: Router,
        private jwtService: JwtHelperService,
    ) { }

    public login(user: LoginDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/auth/login`, user);
    }

    public isAuthenticated(): boolean {
        const token = this.jwtService.tokenGetter();
        const decoded = this.jwtService.decodeToken(token);
        const isLogged = !!token && decoded.iss === this.appConfig.jwtSecret;

        this.isAuth.next(isLogged);
        return isLogged;
    }

    public getUser(): void {
        if (this.isAuthenticated()) {
            const token = this.jwtService.tokenGetter();
            const decodedToken = this.jwtService.decodeToken(token);
            this.user.next(decodedToken);
        } else {
            this.user.next({});
        }
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        this.user.next({});
        this.isAuth.next(false);
        this.router.navigate(['/home']);
    }
}
