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
    @Input() private showClients: boolean;
    constructor(
        private usersService: UsersService,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.clientsData = this.usersService.getClients();
    }

    clientOverview(data) {
        this.usersService.setClientCred(data[1]).subscribe(() => {

            this.router.navigate(['/client/stocks']);
        });
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
