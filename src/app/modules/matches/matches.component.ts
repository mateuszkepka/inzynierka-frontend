import { Component, OnDestroy, OnInit } from '@angular/core';
import { Match, Player, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-matches`,
  templateUrl: `./matches.component.html`,
  styleUrls: [`./matches.component.scss`]
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

  showResolveButton = false;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.matchId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.match = await this.apiService.getMatchById(this.matchId);
    console.log(this.match);
    this.firstTeam = await this.apiService.getTeamById(this.match.firstRoster.team.teamId);
    this.secondTeam = await this.apiService.getTeamById(this.match.secondRoster.team.teamId);
    this.listenOnCurrentUserChange();
    if (this.match.maps.length > 0) {
      this.prepareMapsData();
      this.countTeamsWins();
    }
  }

  ngOnDestroy(): void {
      this.currentUserSub.unsubscribe();
  }

  listenOnCurrentUserChange() {
    this.currentUserSub = this.store
      .select((state) => state.currentUser.currentUser)
      .subscribe(async (currentUser: User | undefined) => {
        if (currentUser) {
          this.currentUser = cloneDeep(currentUser);
          await this.getCurrentUserAccounts();
        }
        this.setShowResolveButton();
      });
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
