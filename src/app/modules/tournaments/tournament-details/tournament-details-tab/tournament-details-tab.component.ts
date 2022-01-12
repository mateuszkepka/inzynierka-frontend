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
  endingHour: Date;

  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.tournament = cloneDeep(tournament);
          if (this.tournament) {
            this.setEndingHour();
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  setEndingHour() {
    this.endingHour = new Date();
    this.endingHour.setHours(this.tournament.endingHour);
    this.endingHour.setMinutes(this.tournament.endingMinutes);
    this.endingHour.setSeconds(0);
    this.endingHour.setMilliseconds(0);
  }
}
