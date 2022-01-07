import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SetTournament } from 'src/app/state/tournament.actions';
import { Store } from '@ngxs/store';
import { Tournament } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-tournament-details`,
  templateUrl: `./tournament-details.component.html`,
  styleUrls: [`./tournament-details.component.scss`]
})
export class TournamentDetailsComponent implements OnInit {

  tournament: Tournament;
  tournamentId: number;

  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.tournamentId = this.activatedRoute.snapshot.params?.id;
  }

  async ngOnInit() {
    this.tournament = await this.apiService.getTournamentById(this.tournamentId);
    this.store.dispatch(new SetTournament(this.tournament));
  }

}
