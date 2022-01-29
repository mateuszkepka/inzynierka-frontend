import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tournament, TournamentAdmin, TournamentRoles, TournamentStatus, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-manage-tournaments`,
  templateUrl: `./manage-tournaments.component.html`,
  styleUrls: [`./manage-tournaments.component.scss`]
})
export class ManageTournamentsComponent implements OnInit, OnDestroy {
  currentUser: User;
  managedTournaments: Tournament[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService
  ) { }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    await this.getManagedTournaments();
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
          if (currentUser) {
            this.currentUser = cloneDeep(currentUser);
          }
        })
    );
  }

  async getManagedTournaments() {
    this.managedTournaments = await this.apiService.getUserTournaments(
      this.currentUser.userId,
      {
        role: TournamentRoles.TOURNAMENT_ADMIN,
        status: TournamentStatus.UPCOMING
      }
    ).catch(() => []);
  }
}
