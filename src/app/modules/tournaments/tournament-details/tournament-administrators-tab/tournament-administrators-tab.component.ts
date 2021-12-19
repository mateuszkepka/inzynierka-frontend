import { ActivatedRoute, Router } from '@angular/router';
import { Component, DoCheck, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Suspension, Tournament, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-tournament-administrators-tab`,
  templateUrl: `./tournament-administrators-tab.component.html`,
  styleUrls: [`./tournament-administrators-tab.component.scss`]
})
export class TournamentAdministratorsTabComponent implements OnInit, OnDestroy, DoCheck {

  administratorsList: User[];
  tournamentId: number;
  currentTournament: Tournament;
  currentUser: User;

  subscriptions: Subscription[] = [];
  isVisible = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    this.listenOnCurrentTournamentChange();
    await this.getAdministratorsList();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  listenOnCurrentTournamentChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.currentTournament = cloneDeep(tournament);
        })
    );
  }

  async getAdministratorsList() {
    this.administratorsList = await this.apiService
      .getTournamentAdmins(this.tournamentId)
      .catch(() => []);
    console.log(this.administratorsList);
  }

  navigateToAddAdmin() {
    void this.router.navigate([`tournaments/${this.tournamentId}/add-admin`]);
  }
}
