import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-tournament-details-tab`,
  templateUrl: `./tournament-details-tab.component.html`,
  styleUrls: [`./tournament-details-tab.component.scss`]
})
export class TournamentDetailsTabComponent implements OnInit, OnDestroy {
  tournament: Tournament;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.tournament = cloneDeep(tournament);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
