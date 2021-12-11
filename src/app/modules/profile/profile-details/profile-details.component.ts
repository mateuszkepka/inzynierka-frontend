import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
  currentlyLoggedUser: User;
  subscriptions: Subscription[] = [];
  currentUserId: number;

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
  ) {
    this.currentUserId = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(
          async (currentUser: User) => {
            if (currentUser) {
              this.currentlyLoggedUser = cloneDeep(currentUser);
            }
            if (currentUser.userId === this.currentUserId) {
              this.currentUser = cloneDeep(currentUser);
              return;
            }
            await this.getCurrentUser();
          }
        ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getCurrentUser() {
    this.currentUser = await this.apiService.getUserById(this.currentUserId);
  }

}
