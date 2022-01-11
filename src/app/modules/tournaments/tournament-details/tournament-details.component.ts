import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tournament, TournamentTeam, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetTournament } from 'src/app/state/tournament.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { differenceInMilliseconds } from 'date-fns';

@Component({
  selector: `app-tournament-details`,
  templateUrl: `./tournament-details.component.html`,
  styleUrls: [`./tournament-details.component.scss`]
})
export class TournamentDetailsComponent implements OnInit, OnDestroy {

  tournament: Tournament;
  tournamentId: number;
  tournamentTeams: TournamentTeam[] = [];
  checkedIn: number;
  isRegistrationActive = false;

  currentUser: User;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService,
  ) {
    this.tournamentId = this.activatedRoute.snapshot.params?.id;
  }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    this.tournament = await this.apiService.getTournamentById(this.tournamentId);
    this.setIsRegistrationActive();
    this.tournamentTeams = await this.apiService.getTournamentTeams(this.tournamentId);
    this.setCheckedIn();
    this.store.dispatch(new SetTournament(this.tournament));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  setCheckedIn() {
    const checkedInTeams = this.tournamentTeams.filter((team) => team.status === `checked`);
    this.checkedIn = checkedInTeams.length;
  }

  async sendCheckInRequest() {
    const userAccounts = await this.apiService.getUserAccounts(this.currentUser.userId);
    const userTeams = await this.apiService.getUserTeams(this.currentUser.userId);

    const accountsIds = userAccounts.map((value) => value.playerId);
    const ownedTeams = userTeams.map((value) => {
      if (accountsIds.includes(value.captainId)) {
        return value;
      }
    });

    const ownedTeamsIds = ownedTeams.map((value) => value.teamId);

    const foundTournamentTeam = this.tournamentTeams.find((value) => ownedTeamsIds.includes(value.team.teamId));

    const res = await this.apiService.checkInTorunament(this.tournamentId, foundTournamentTeam.team.teamId);

    if (res.ok) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Checked in!`,
        detail: `You have successfully checked in ${foundTournamentTeam.team.teamName}!`
      });
      return;
    }
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

  setIsRegistrationActive() {
    const now = new Date();
    const registerStartDate = new Date(this.tournament.registerStartDate);

    const diff = differenceInMilliseconds(now, registerStartDate);

    this.isRegistrationActive = diff > 0;
  }
}
