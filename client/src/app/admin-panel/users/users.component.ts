import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/config/app.config';
import { UsersManageModel } from 'src/app/models/users-manage.model';

@Component({
  selector: 'app-admin-panel-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['role', 'name', 'email', 'manager', 'funds'];
  dataSource: MatTableDataSource<UsersManageModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    ) {  }

  async ngOnInit() {
    let users = await this.getUsers();
    users = users.map((user) => {
      if (user.funds) {
        if (user.manager) {
          // tslint:disable-next-line:max-line-length
          return { name: user.fullname, email: user.email, role: user.role.rolename, manager: user.manager.email, funds: user.funds.currentamount };
        }// tslint:disable-next-line:max-line-length
        return { name: user.fullname, email: user.email, role: user.role.rolename, manager: '', funds: user.funds.currentamount };
      }
      return { name: user.fullname, email: user.email, role: user.role.rolename, manager: 'Not assignable' };
    });
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async getUsers() {
    const bearerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token')
  });
    let users;
    await this.http.get(`${this.appConfig.apiUrl}/users`, { headers: bearerToken  }).toPromise().then((response) => {
      users = response;
    });
    await this.http.get(`${this.appConfig.apiUrl}/users/managers`, { headers: bearerToken  }).toPromise().then((response: []) => {
      response.forEach((user) => users.push(user));
    });
  console.log(users);
   return users;
  }
}
