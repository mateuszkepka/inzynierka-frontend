import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Invitation, Player, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
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
  @Input() captain: Player;
  @Input() currentUserAccounts: Player[];

  currentUser: User;
  subscriptions: Subscription[] = [];
  showInviteButton = false;
  membersList: Invitation[] = [];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiService: ApiService,
  ) { }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    await this.getMembersList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getMembersList() {
    this.membersList = await this.apiService.getTeamMembers(this.currentTeam.teamId);
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
    this.showInviteButton = Boolean(this.currentUserAccounts.find((account) => account.playerId === this.captain.playerId));
  }

  navigateToInvitePlayers() {
    void this.router.navigate([`/team/${this.currentTeam.teamId}/invite-players`]);
  }

}
