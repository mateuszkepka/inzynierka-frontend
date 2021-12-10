import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RegisterForTournamentInput, Team, Tournament, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-register-for-tournament`,
  templateUrl: `./register-for-tournament.component.html`,
  styleUrls: [`./register-for-tournament.component.scss`]
})
export class RegisterForTournamentComponent implements OnInit, OnDestroy {

  tournament: Tournament;
  currentUser: User;
  subscriptions: Subscription[] = [];
  teamsList: Team[] = [];

  faTrophy: IconDefinition = faTrophy;

  form = new FormGroup({});

  model: RegisterForTournamentInput = {
    teamId: undefined,
    tournamentId: undefined,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: `teamId`,
      type: `dropdown`,
      templateOptions: {
        label: `Choose team you want to start with`,
        placeholder: `Choose team`,
        showClear: true,
        options: this.teamsList,
        optionLabel: `name`,
        optionValue: `teamId`,
        modelField: `teamId`
      }
    }
  ];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.tournament = cloneDeep(tournament);
        }),
        this.store
          .select((state) => state.currentUser.currentUser)
          .subscribe((currentUser: User) => {
            this.currentUser = cloneDeep(currentUser);
          }),
    );

    this.setTeamsList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async setTeamsList() {
    this.teamsList = await this.apiService.getUserTeams(this.currentUser.userId);
    console.log(this.teamsList);
  }

  async onSubmit() {
    this.model.tournamentId = this.tournament.tournamentId;

    const response = await this.apiService.registerTeamForTournament(this.model);

    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Your team has been registered`,
        detail: `Wait for admins to accept your registration`
      });
      void this.router.navigate([`/tournaments/${this.tournament.tournamentId}`]);
      return;
    }

    this.notificationsService.addNotification({
        severity: `error`,
        summary: `Error!`,
        detail: `Something went wrong.`
    });
  }

}
