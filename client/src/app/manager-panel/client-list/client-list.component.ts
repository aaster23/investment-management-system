import { AuthService } from 'src/app/core/auth.service';
import { Component, Injectable, OnInit, Input, } from '@angular/core';
import { UsersService } from 'src/app/core/user.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
    private clientsData = []; /* [ [Martin, 500], [Ivan, 50000 ] ]*/
    private managerName: string;
    @Input() private showClients: boolean;
    constructor(
        private usersService: UsersService,
        private auth: AuthService,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.clientsData = this.usersService.getClients();
        this.managerName = this.auth.decodeToken().name;
    }

    clientOverview(data) {
        this.usersService.setClientCred(data[1]);
        setTimeout(() => {
            this.router.navigate(['/client']);
        }, 600);
    }

    myFunction() {
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        table = document.getElementById('myTable');
        tr = table.getElementsByTagName('tr');
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }
}
