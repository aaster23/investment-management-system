import { AppConfig } from './../config/app.config';
import { AdminGuardService } from './../route-guard/admin.guard';
import { LoginDTO } from './../models/user-login.dto';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    private selectedMenu: string;

    constructor(
        public snackBar: MatSnackBar,
    ) { }
    ngOnInit(): void {
    }

    private selectMenu(menu: string) {
        this.selectedMenu = menu;
    }
}
