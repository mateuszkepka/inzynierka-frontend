import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player, Team, User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep, isEqual } from 'lodash';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

@Component({
  selector: `app-profile-teams`,
  templateUrl: `./profile-teams.component.html`,
  styleUrls: [`./profile-teams.component.scss`]
})
export class ProfileTeamsComponent implements OnInit, OnDestroy {
  //! TODO: add teams other teams than owned
  currentUser: User;
  susbscriptions: Subscription[] = [];
  teamsList: Team[] = [];

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
  ) { }

  ngOnInit() {
    this.susbscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          this.setTeamsList();
        })
    );
  }

  ngOnDestroy() {
    this.susbscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  setTeamsList() {
    if (!this.currentUser.accounts.length) {
      return;
    }

    this.currentUser.accounts.forEach(async (account) => {
      const player = await this.apiService.getPlayerById(account.playerId);
      this.teamsList.push(...player.ownedTeams);
    });
  }

}
