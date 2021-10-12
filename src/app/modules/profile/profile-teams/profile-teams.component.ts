import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-teams`,
  templateUrl: `./profile-teams.component.html`,
  styleUrls: [`./profile-teams.component.scss`]
})
export class ProfileTeamsComponent implements OnInit, OnDestroy {
  //! TODO: add teams list from user player
  currentUser: User;
  susbscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit() {
    this.susbscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  ngOnDestroy() {
    this.susbscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
