import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SetCurrentTeam } from 'src/app/state/current-team.actions';
import { Store } from '@ngxs/store';
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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly store: Store,
  ) {
    this.teamId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit(){
    this.team = await this.apiService.getTeamById(this.teamId);
    this.store.dispatch(new SetCurrentTeam(this.team));
  }

}
