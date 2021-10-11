import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-suspensions`,
  templateUrl: `./profile-suspensions.component.html`,
  styleUrls: [`./profile-suspensions.component.scss`]
})
export class ProfileSuspensionsComponent implements OnInit, OnDestroy {
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
