import * as data from './modules-config.json';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { NotificationsService } from 'src/app/services/notifications.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-user-dashboard`,
  templateUrl: `./user-dashboard.component.html`,
  styleUrls: [`./user-dashboard.component.scss`]
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  currentUser: User;
  subscriptions: Subscription[] = [];
  modulesData = data;

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
