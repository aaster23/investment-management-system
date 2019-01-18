import { LoginDTO } from './../models/user-login.dto';
import { NgForm } from '@angular/forms';
import { LoginComponent } from './../login/login.component';
import { UsersService } from './../core/user.service';
import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    private user: any;
    constructor() {
    }

    ngOnInit(): void {
    }
}
