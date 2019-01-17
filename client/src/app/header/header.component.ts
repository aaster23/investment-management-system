import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { TokenDTO } from '../models/token.dto';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private auth: AuthService) { }
    private logout() {
        this.auth.logout();
    }
}
