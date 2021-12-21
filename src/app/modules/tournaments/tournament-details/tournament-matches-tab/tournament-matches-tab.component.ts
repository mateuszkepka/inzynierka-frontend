import { Component, DoCheck, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Match, MatchStatus, Tournament } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-tournament-matches-tab`,
  templateUrl: `./tournament-matches-tab.component.html`,
  styleUrls: [`./tournament-matches-tab.component.scss`]
})
export class TournamentMatchesTabComponent implements OnInit, OnDestroy, DoCheck {
  tournament: Tournament;
  subscriptions: Subscription[] = [];
  tournamentId: number;
  isVisible = false;
  isLoading = false;

  matchesList: Match[] = [];

  statusOptions: { status: string; label: string }[];

  status = MatchStatus.SCHEDULED;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly elementRef: ElementRef,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.setStatusOptions();
    this.listenOnTournamentChange();
    await this.loadTournamentMatches();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  listenOnTournamentChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.tournament = cloneDeep(tournament);
        }),
    );
  }

  async loadTournamentMatches() {
    this.matchesList =
      await this.apiService
        .getTournamentMatches(this.tournamentId, this.status)
        .catch(() => []);
    console.log(this.matchesList);
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(MatchStatus).map((key) => ({
      status: MatchStatus[key],
      label: this.toProperCase(MatchStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }
}
