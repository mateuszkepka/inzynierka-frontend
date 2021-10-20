import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-details`,
  templateUrl: `./profile-details.component.html`,
  styleUrls: [`./profile-details.component.scss`]
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute
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
