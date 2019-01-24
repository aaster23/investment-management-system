import { UsersService } from '../core/user.service';
import { Component, Injectable, OnInit, Output, } from '@angular/core';
import { UserInfoDTO } from '../models/userInfo.dto';

@Injectable()
@Component({
    selector: 'app-client-panel',
    templateUrl: './client-panel.component.html',
    styleUrls: ['./client-panel.component.css']
})
export class ClientPanelComponent implements OnInit {
    constructor(private usersService: UsersService) {
    }
    ngOnInit(): void {
        this.usersService.clientData.subscribe(
            (response: UserInfoDTO) => {
                this.clientName = response.fullname;
            }
        );
    }
}
