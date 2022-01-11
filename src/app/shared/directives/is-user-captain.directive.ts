import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Tournament, TournamentTeam, User } from '../interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Directive({
  selector: `[appIsUserCaptain]`
})
export class IsUserCaptainDirective implements OnDestroy, OnInit {

  @Input() tournament: Tournament;
  @Input() tournamentTeams: TournamentTeam[];
  currentUser: User| undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
  ) {}

  ngOnInit() {
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
        .subscribe(async (currentUser: User | undefined) => {
          this.currentUser = cloneDeep(currentUser);
          await this.setElementVisibility();
        })
    );
  }

  async setElementVisibility() {
    const userAccounts = await this.apiService
      .getUserAccounts(this.currentUser.userId)
      .catch(() => []);

    const userTeams = await this.apiService.getUserTeams(this.currentUser.userId)
    .catch(() => []);

    const accountsIds = userAccounts.map((value) => value.playerId);

    const promises = userTeams.map(async (value) => {
      const team = await this.apiService.getTeamById(value.teamId);
      if (accountsIds.includes(team.captainId)) {
        return value;
      }
    });

    const ownedTeams = await Promise.all(promises);
    const ownedTeamsIds = ownedTeams.map((value) => value.teamId);

    const foundTournamentTeam = this.tournamentTeams.find((value) => ownedTeamsIds.includes(value.team.teamId));

    if (!foundTournamentTeam || foundTournamentTeam.status === `checked`) {
      this.setInvisible();
    }
  }

  setInvisible() {
    this.elementRef.nativeElement.style.display = `none`;
  }
}
