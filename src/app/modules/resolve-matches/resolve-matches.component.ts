import { Component, OnDestroy, OnInit } from '@angular/core';
import { Match, MatchStatus, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-resolve-matches`,
  templateUrl: `./resolve-matches.component.html`,
  styleUrls: [`./resolve-matches.component.scss`]
})
export class ResolveMatchesComponent implements OnInit, OnDestroy {

  currentUser: User;
  matches: Match[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
  ) { }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    await this.getMatches();
  }

  ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  async getMatches() {
    const scheduledMatches = await this.apiService.getUserMatches(
      this.currentUser.userId,
      MatchStatus.SCHEDULED
    ).catch(() => []);

    const resolvingMatches = await this.apiService.getUserMatches(
      this.currentUser.userId,
      MatchStatus.RESOLVING
    ).catch(() => []);


    this.matches = [
      ...scheduledMatches,
      ...resolvingMatches
    ];
  }
}
