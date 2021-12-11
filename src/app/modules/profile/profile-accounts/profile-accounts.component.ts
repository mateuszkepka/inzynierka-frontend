import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
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

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.currentProfileId = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit() {
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

}
