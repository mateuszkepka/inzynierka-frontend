import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GroupStanding } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-tournament-groups-tab`,
  templateUrl: `./tournament-groups-tab.component.html`,
  styleUrls: [`./tournament-groups-tab.component.scss`]
})
export class TournamentGroupsTabComponent implements OnInit {

  groupStandings: GroupStanding[];
  tournamentId: number;

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.getGroupStandings();
  }

  async getGroupStandings() {
    this.groupStandings = await this.apiService.getTournamentStandings(this.tournamentId);
  }

  onTabChange() {
    window.scroll(0,0);
  }

}
