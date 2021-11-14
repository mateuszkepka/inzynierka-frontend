import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-user-accounts`,
  templateUrl: `./user-accounts.component.html`,
  styleUrls: [`./user-accounts.component.scss`]
})
export class UserAccountsComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscriptions: Subscription[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
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
