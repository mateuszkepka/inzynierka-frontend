import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-team`,
  templateUrl: `./team.component.html`,
  styleUrls: [`./team.component.scss`]
})
export class TeamComponent implements OnInit {

  teamId: number;
  subscriptions: Subscription[] = [];
  team: Team;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly apiService: ApiService) {
    this.teamId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit(){
    this.team = await this.apiService.getTeamById(this.teamId);
  }

}
