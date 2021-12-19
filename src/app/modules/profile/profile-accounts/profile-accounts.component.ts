import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Player, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-accounts`,
  templateUrl: `./profile-accounts.component.html`,
  styleUrls: [`./profile-accounts.component.scss`]
})
export class ProfileAccountsComponent implements OnInit, OnDestroy {

  @Input() currentUser: User;
  currentlyLoggedUser: User;
  currentlyLoggedUserSub: Subscription;
  currentProfileId: number;

  userAccounts: Player[] = [];

  isLoading = false;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.currentProfileId = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit() {
    this.getUserAccounts();
    this.listenOnCurrentlyLoggedUserChange();
  }

  ngOnDestroy() {
    this.currentlyLoggedUserSub.unsubscribe();
  }

  listenOnCurrentlyLoggedUserChange() {
    this.currentlyLoggedUserSub = this.store.select((state) => state.currentUser.currentUser)
    .subscribe((currentUser: User) => {
      if (currentUser) {
        this.currentlyLoggedUser = cloneDeep(currentUser);
      }
    });
  }

  async getUserAccounts() {
    this.isLoading = true;
    this.userAccounts = await this.apiService.getUserAccounts(this.currentProfileId)
        .catch(() => {
          this.isLoading = false;
          return [];
        });
    this.isLoading = false;
  }

}
