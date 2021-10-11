import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { isEqual } from 'lodash';

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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly apiService: ApiService,
  ) {
    this.activeTab = this.router.getCurrentNavigation().extras.state?.activeTab || 0;
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = currentUser;
        }),
    );
    await this.getUserDetails();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getUserDetails() {
    const result = await this.apiService.getUserById(this.currentUser.userId);
    if (!isEqual(this.currentUser, result)) {
      this.store.dispatch(new SetCurrentUser(result));
    }
  }
}
