import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-performance`,
  templateUrl: `./profile-performance.component.html`,
  styleUrls: [`./profile-performance.component.scss`]
})
export class ProfilePerformanceComponent implements OnInit, OnDestroy {
  //! TODO: add performances list from user player

  currentUser: User;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
  ) { }

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
