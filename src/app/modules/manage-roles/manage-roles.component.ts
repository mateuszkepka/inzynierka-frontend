import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-manage-roles`,
  templateUrl: `./manage-roles.component.html`,
  styleUrls: [`./manage-roles.component.scss`]
})
export class ManageRolesComponent implements OnInit {

  users: User[] = [];
  allUsers: User[] = [];
  filterValue = ``;

  constructor(private readonly apiService: ApiService, private readonly notificationsService: NotificationsService) { }

  async ngOnInit() {
    this.users = await this.apiService.getAllUsers();
    this.allUsers = cloneDeep(this.users);
  }

  async grantRole(role: string, user: User) {
    const res = await this.apiService.grantRole(role, user.userId)
    .catch(() => this.showErrorNotification());

    if (res) {
      const foundUser = this.users.find((value) => value.userId === res.userId);
      const foundUserIndex = this.users.indexOf(foundUser);
      this.users[foundUserIndex] = res;
      this.users = cloneDeep(this.users);
      this.showSuccessNotification();
    }
  }

  async revokeRole(role: string, user: User) {
    const res = await this.apiService.revokeRole(role, user.userId)
    .catch(() => this.showErrorNotification());

    if (res) {
      const foundUser = this.users.find((value) => value.userId === res.userId);
      const foundUserIndex = this.users.indexOf(foundUser);
      this.users[foundUserIndex] = res;
      this.users = cloneDeep(this.users);
      this.showSuccessNotification();
    }
  }

  showSuccessNotification() {
    this.notificationsService.addNotification({
      severity: `success`,
      summary: `Success`,
      detail: `Role changed`
    });
  }

  showErrorNotification() {
    this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error`,
      detail: `Error while changing role`
    });
  }

  filterUsers() {
    this.users = this.allUsers.filter((value) => value.username.includes(this.filterValue));
  }
}
