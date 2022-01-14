import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Match } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-matches`,
  templateUrl: `./matches.component.html`,
  styleUrls: [`./matches.component.scss`]
})
export class MatchesComponent implements OnInit {

  matchId: number;
  match: Match;

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.matchId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.match = await this.apiService.getMatchById(this.matchId);
  }

}
