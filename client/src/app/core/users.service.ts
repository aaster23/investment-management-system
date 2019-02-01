import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app.config';


@Injectable()
export class AdminPanelUsersService {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
  ) { }

  public async getClients() {
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
    return users;

  }

  private async getUsers() {
    const bearerToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    });
    let users;
    await this.http.get(`${this.appConfig.apiUrl}/users`, { headers: bearerToken }).toPromise().then((response) => {
      users = response;
    });
    await this.http.get(`${this.appConfig.apiUrl}/users/managers`, { headers: bearerToken }).toPromise().then((response: []) => {
      response.forEach((user) => users.push(user));
    });
    return users;
  }
}
