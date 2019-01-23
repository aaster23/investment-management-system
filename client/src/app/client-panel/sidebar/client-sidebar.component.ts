import { Component, Injectable, OnInit, } from '@angular/core';
import { UsersService } from '../../core/user.service';
import { UserInfoDTO } from '../../models/userInfo.dto';

@Injectable()
@Component({
    selector: 'app-client-sidebar',
    templateUrl: './client-sidebar.compoennt.html',
    styleUrls: ['./client-sidebar.component.css'],
})
export class ClientSidebarComponent implements OnInit {
    private clientName: string;
    constructor(
        private usersService: UsersService,
    ) { }

    ngOnInit(): void {
    }
}
