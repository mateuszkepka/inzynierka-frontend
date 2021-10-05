import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: `app-profile`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.scss`]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscriptions: Subscription[] = [];
  activeTab: number;

  constructor(
    public route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.activeTab = this.router.getCurrentNavigation().extras.state?.activeTab || 0;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = currentUser;
        }),

    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
