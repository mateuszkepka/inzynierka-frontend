import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-user-accounts`,
  templateUrl: `./user-accounts.component.html`,
  styleUrls: [`./user-accounts.component.scss`]
})
export class UserAccountsComponent implements OnInit, OnDestroy {
  currentUser: User;
  userAccounts: Player[] = [];
  subscriptions: Subscription[] = [];

  constructor(private readonly store: Store, private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(async (currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          await this.getUserAccounts();
        })
    );
  }

  async getUserAccounts() {
    this.userAccounts = await this.apiService.getUserAccounts(this.currentUser.userId).catch(() => []);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
