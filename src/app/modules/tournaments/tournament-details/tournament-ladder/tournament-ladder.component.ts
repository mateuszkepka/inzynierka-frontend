import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Dictionary, groupBy } from 'lodash';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: `app-tournament-ladder`,
  templateUrl: `./tournament-ladder.component.html`,
  styleUrls: [`./tournament-ladder.component.scss`]
})
export class TournamentLadderComponent implements OnInit {
  tournamentId: number;

  upperBracketMatches: any[] = [];
  lowerBracketMatches: any[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
      const res = await this.apiService.getTournamentStandings(this.tournamentId);
      this.setBrackets(res[0], `upperBracketMatches`);
      if (res.length > 1) {
        this.setBrackets(res[1], `lowerBracketMatches`);
      }
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
}
