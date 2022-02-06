import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep, groupBy } from 'lodash';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-tournament-ladder`,
  templateUrl: `./tournament-ladder.component.html`,
  styleUrls: [`./tournament-ladder.component.scss`]
})
export class TournamentLadderComponent implements OnInit, OnDestroy {
  tournamentId: number;
  tournament: Tournament;
  errorText = ``;

  upperBracketMatches: any[] = [];
  lowerBracketMatches: any[] = [];

  templates: any[] =[];
  height: string;

  tournamentSub: Subscription;

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
      this.listenOnTournamentChange();
      const res = await this.apiService.getTournamentStandings(this.tournamentId).catch((err) => {
        this.errorText = err.error.message;
        return [];
      });
      if (res.length > 0) {
        this.setBrackets(res[0], `upperBracketMatches`);
        if (res.length > 1) {
          this.setBrackets(res[1], `lowerBracketMatches`);
        }
      }
  }

  ngOnDestroy(): void {
      this.tournamentSub.unsubscribe();
  }

  setBrackets(bracketMatches, arrayKey: string) {
    if (!bracketMatches) {
      return;
    }
    const matchesMap = groupBy(bracketMatches.matches, `round`);

    Object.keys(matchesMap).forEach((key) => {
      this[arrayKey].push(matchesMap[key]);
    });

    this[arrayKey] = this[arrayKey].slice().reverse();
  }


  navigateToTeam(teamId: number) {
    if (!teamId) {
      return;
    }
    void this.router.navigate([`/team/${teamId}`]);
  }

  setBracketHeight() {
    this.height = `${150 * (this.tournament.numberOfTeams / 2)}px`;
  }

  listenOnTournamentChange() {
    this.tournamentSub = this.store
      .select((state) => state.tournament.tournament)
      .subscribe((tournament: Tournament) => {
        if (tournament) {
          this.tournament = cloneDeep(tournament);
          this.setBracketHeight();
        }
      });
  }
}
