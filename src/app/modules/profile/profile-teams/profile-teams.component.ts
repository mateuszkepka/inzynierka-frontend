import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Team, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-teams`,
  templateUrl: `./profile-teams.component.html`,
  styleUrls: [`./profile-teams.component.scss`]
})
export class ProfileTeamsComponent implements OnInit, OnDestroy {
  //! TODO: add teams other teams than owned
  @Input() currentUser: User;
  currentlyLoggedUser: User;
  teamsList: Team[] = [];
  currentlyLoggedUserSub: Subscription;
  currentProfileId: number;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.currentProfileId = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit() {
    this.setTeamsList();
    this.listenOnCurrentlyLoggedUserChange();
  }

  ngOnDestroy() {
      this.currentlyLoggedUserSub.unsubscribe();
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

  listenOnCurrentlyLoggedUserChange() {
    this.currentlyLoggedUserSub = this.store.select((state) => state.currentUser.currentUser)
    .subscribe((currentUser: User) => {
      if (currentUser) {
        this.currentlyLoggedUser = cloneDeep(currentUser);
      }
    });
  }
}
