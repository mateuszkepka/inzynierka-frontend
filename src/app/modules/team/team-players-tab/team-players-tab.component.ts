import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Team, User } from 'src/app/shared/interfaces/interfaces';

import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-team-players-tab`,
  templateUrl: `./team-players-tab.component.html`,
  styleUrls: [`./team-players-tab.component.scss`]
})
export class TeamPlayersTabComponent implements OnInit, OnDestroy {

  @Input() currentTeam: Team;
  currentUser: User;
  subscriptions: Subscription[] = [];
  showInviteButton = false;

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listenOnCurrentUserChange();
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
          this.setShowInviteButton();
        })
    );
  }

  setShowInviteButton() {
    this.showInviteButton = Boolean(this.currentUser.accounts.find((account) => account.playerId === this.currentTeam.captain.playerId));
  }

  navigateToInvitePlayers() {
    void this.router.navigate([`/team/${this.currentTeam.teamId}/invite-players`]);
  }

}
