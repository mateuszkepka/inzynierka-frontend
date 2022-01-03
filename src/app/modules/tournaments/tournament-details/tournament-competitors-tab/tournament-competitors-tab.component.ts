import { Component, DoCheck, ElementRef, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Team } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-tournament-competitors-tab`,
  templateUrl: `./tournament-competitors-tab.component.html`,
  styleUrls: [`./tournament-competitors-tab.component.scss`]
})
export class TournamentCompetitorsTabComponent implements OnInit, DoCheck {
  // TODO: FINISH TEMPLATE
  teamsList: Team[];
  tournamentId: number;

  isVisible = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.setTeamsList();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async setTeamsList() {
    this.teamsList = await this.apiService
      .getTournamentTeams(this.tournamentId, true)
      .catch(() => []);
  }

}