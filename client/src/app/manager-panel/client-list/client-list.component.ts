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

    // this evil magic here is for searching functionality
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
