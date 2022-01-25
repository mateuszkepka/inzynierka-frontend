import { Component, OnDestroy, OnInit } from '@angular/core';
import { Match, Player, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatchChangeDateModalComponent } from './match-change-date-modal/match-change-date-modal.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-matches`,
  templateUrl: `./matches.component.html`,
  styleUrls: [`./matches.component.scss`],
  providers: [DialogService]
})
export class MatchesComponent implements OnInit, OnDestroy {

  matchId: number;

  firstTeamMatchesCount = 0;
  secondTeamMatchesCount = 0;
  match: Match;

  firstTeam: Team;
  secondTeam: Team;

  currentUser: User | undefined;
  currentUserAccounts: Player[] = [];
  currentUserSub: Subscription;
  subscriptions: Subscription[] = [];

  showChangeDateButton = false;
  showResolveButton = false;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService,
    public dialogService: DialogService,
  ) {
    this.matchId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.match = await this.apiService.getMatchById(this.matchId);
    this.firstTeam = await this.apiService.getTeamById(this.match.firstRoster.team.teamId);
    this.secondTeam = await this.apiService.getTeamById(this.match.secondRoster.team.teamId);
    this.listenOnCurrentUserChange();
    if (this.match.maps.length > 0) {
      this.prepareMapsData();
      this.countTeamsWins();
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(async (currentUser: User | undefined) => {
          if (currentUser) {
            this.currentUser = cloneDeep(currentUser);
            await this.getCurrentUserAccounts();
          }
          this.setShowResolveButton();
          await this.setShowChangeDateButton();
        })
    );
  }

  async getCurrentUserAccounts() {
    if (!this.currentUser) {
      return;
    }
    this.currentUserAccounts = await this.apiService
      .getUserAccounts(this.currentUser.userId)
      .catch(() => []);
  }

  setShowResolveButton() {
    if (this.currentUserAccounts.length === 0) {
      return false;
    }
    const accountIds = this.currentUserAccounts.map((value) => value.playerId);
    const isFirstTeamCaptain = accountIds.find((value) => value === this.firstTeam.captainId);
    const isSecondTeamCaptain = accountIds.find((value) => value === this.secondTeam.captainId);

    this.showResolveButton = Boolean(isFirstTeamCaptain) || Boolean(isSecondTeamCaptain);
  }


  async setShowChangeDateButton() {
    if (!this.currentUser) {
      this.showChangeDateButton = false;
      return;
    }
    const admins = await this.apiService
      .getTournamentAdmins(22)
      .catch(() => []);
    if (admins.length === 0) {
      this.showChangeDateButton = false;
      return;
    }

    const foundValue = admins.find((admin) => admin.userId === this.currentUser.userId);

    if (foundValue) {
      this.showChangeDateButton = true;
    }
  }

  showModal(match: Match) {
    const ref = this.dialogService.open(
      MatchChangeDateModalComponent,
      {
        header: `Change match date`,
        data: { matchStartDate: match.matchStartDate }
    });

    this.subscriptions.push(
      ref.onClose.subscribe(async (newMatchDate: Date) => {
        if (newMatchDate) {
          await this.updateMatch(newMatchDate, match);
        }
      })
    );
  }

  async updateMatch(newMatchDate: Date, match: Match) {
    const res = await this.apiService
    .updateMatch(match.matchId, { matchStartDate: newMatchDate })
    .catch((err) => this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error while updating date`,
      detail: `${err.error.message}`
    }));

    if (res) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Date updated`
      });
      this.match = res;
    }
  }

  prepareMapsData() {
    this.prepareRosterData(this.match.firstRoster.roster);
    this.prepareRosterData(this.match.secondRoster.roster);
  }

  prepareRosterData(roster) {
    roster.forEach((player) => {
      this.match.maps.forEach((map) => {
        const performance = map.performances.find((perf) => perf.playerId === player.playerId);
        if (!player.performances) {
          player.performances = [];
        }
        player.performances.push(performance);
      });
    });
  }

  countTeamsWins() {
    this.match.maps.forEach((map) =>
      map.mapWinner === 1 ? ++this.firstTeamMatchesCount : ++this.secondTeamMatchesCount
    );
  }

}
