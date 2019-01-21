import { Component, Injectable, OnInit, } from '@angular/core';
import { UsersService } from 'src/app/core/user.service';

@Injectable()
@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
    private clientData = []; /* [ [Martin, 500], [Ivan, 50000 ] ]*/

    constructor(
        private usersService: UsersService,
    ) { }
    ngOnInit(): void {
        this.clientData = this.usersService.getClients();
    }
}
