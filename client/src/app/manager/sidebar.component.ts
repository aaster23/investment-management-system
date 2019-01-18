import { AuthService } from './../core/auth.service';
import { UserInfoDTO } from './../models/userInfo.dto';
import { UsersService } from './../core/user.service';
import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    private managerName: string;
    private user: UserInfoDTO;
    constructor(
        private usersService: UsersService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        const token = this.auth.decodeToken();
        const email = {
            email: token.email,
        };
        this.usersService.retrieveUserData(email).subscribe(
            (managerData: UserInfoDTO) => { this.managerName = managerData.fullname; }
        );
    }
}
