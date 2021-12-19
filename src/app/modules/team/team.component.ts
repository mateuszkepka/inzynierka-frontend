import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Player, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetCurrentTeam } from 'src/app/state/current-team.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-team`,
  templateUrl: `./team.component.html`,
  styleUrls: [`./team.component.scss`]
})
export class TeamComponent implements OnInit {

  teamId: number;
  subscriptions: Subscription[] = [];
  team: Team;
  currentUser: User | undefined;
  currentUserAccounts: Player[] = [];
  showManageButtons = false;
  captain: Player;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
  ) {
    this.teamId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit(){
    this.team = await this.apiService.getTeamById(this.teamId);
    this.captain = await this.apiService.getPlayerById(this.team.captainId);
    this.store.dispatch(new SetCurrentTeam(this.team));
    this.listenOnCurrentUserChange();
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(async (currentUser: User | undefined) => {
          if (currentUser) {
            this.currentUser = cloneDeep(currentUser);
            await this.setCurrentUserAccounts();
            this.setShowManageButton();
          }
        })
    );
  }

  setShowManageButton() {
    this.showManageButtons = Boolean(this.currentUserAccounts.find((value) => value.playerId === this.captain.playerId));
  }

  async setCurrentUserAccounts() {
    this.currentUserAccounts = await this.apiService.getUserAccounts(this.currentUser.userId);
  }

  navigateToEditTeam() {
    void this.router.navigate([`/team`, this.teamId, `edit`]);
  }

  async deleteTeam() {
    const res = await this.apiService.deleteTeam(this.teamId);

    if (res.ok) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been deleted.`
      });
      void this.router.navigate([`/profile/${this.currentUser.userId}`]);
      return;
    }
    this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error!`,
      detail: `Something went wrong.`
    });
  }
}
