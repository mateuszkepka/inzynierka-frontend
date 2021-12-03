import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvitePlayerInput, Player, Team } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetCurrentTeam } from 'src/app/state/current-team.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-invite-players`,
  templateUrl: `./invite-players.component.html`,
  styleUrls: [`./invite-players.component.scss`]
})
export class InvitePlayersComponent implements OnInit, OnDestroy {

  faUsers: IconDefinition = faUsers;
  invitationsList: Player[] = [];
  playersList: Player[] = [];
  results: Player[] = [];
  currentTeam: Team;
  teamId: number;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.teamId = this.activatedRoute.snapshot.params.id;
  }

  async ngOnInit() {
    this.listenOnCurrentTeamChange();
    await this.getPlayersList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  listenOnCurrentTeamChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentTeam.team)
        .subscribe(async (team: Team) => {
          if (team) {
            this.currentTeam = cloneDeep(team);
          }
          this.getTeam();
        })
    );
  }

  async getTeam() {
    const res = await this.apiService.getTeamById(this.teamId);
    this.currentTeam = cloneDeep(res);
    this.store.dispatch(new SetCurrentTeam(this.currentTeam));
  }

  async getPlayersList() {
    // TODO : change for get players who are not in this team
    this.playersList = await this.apiService.getAllPlayers();
  }

  search(event: any) {
    const res = this.playersList.filter((player) =>
      player.summonerId.toLowerCase().startsWith(event.query.toLowerCase())
    );
    this.results = res;
  }

  onSubmit() {
    if (!this.invitationsList.length) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `No player selected`,
        detail: `Please select at least one player`,
      });
      return;
    }
    this.invitationsList.forEach(async (invitation) => {
      const invitationResult = await this.apiService.invitePlayer({playerId: invitation.playerId, teamId: this.currentTeam.teamId});

      if (invitationResult) {
        this.notificationsService.addNotification({
          severity: `success`,
          summary: `Successful invitation`,
          detail: `Player '${invitation.summonerId}' has been invited`,
        });
        return;
      }
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Invitation not sent, please try again`,
      });
    });

    void this.router.navigate([`/team/${this.currentTeam.teamId}`]);
  }

}
