import { UsersService } from './../core/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, Injectable, OnInit, } from '@angular/core';

@Injectable()
@Component({
    selector: 'app-manager-panel',
    templateUrl: './manager-panel.component.html',
    styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
    private managerName: string;
    constructor(
        private usersService: UsersService,
    ) { }

    ngOnInit(): void {
        this.managerName = this.usersService.getDecodedToken().name;
    }
}
