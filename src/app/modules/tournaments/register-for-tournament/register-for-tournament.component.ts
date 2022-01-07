import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Invitation, Player, RegisterForTournamentInput, Team, Tournament, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-register-for-tournament`,
  templateUrl: `./register-for-tournament.component.html`,
  styleUrls: [`./register-for-tournament.component.scss`]
})
export class RegisterForTournamentComponent implements OnInit, OnDestroy, DoCheck {

  tournament: Tournament;
  tournamentId: number;
  currentUser: User;
  subscriptions: Subscription[] = [];
  teamsList: Team[] = [];
  differ: KeyValueDiffer<string, any>;
  results: Invitation[] = [];
  playersList: Invitation[] = [];

  faTrophy: IconDefinition = faTrophy;

  form = new FormGroup({});

  model = {
    teamId: undefined,
    roster: [],
    subs: [],
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
        optionLabel: `teamName`,
        optionValue: `teamId`,
        modelField: `teamId`
      }
    }
  ];

  constructor(
    private readonly store: Store,
    private readonly differs: KeyValueDiffers,
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
    this.differ = this.differs.find(this.model).create();
  }

  async ngOnInit() {
    await this.getCurrentTournament();
    this.subscriptions.push(
        this.store
          .select((state) => state.currentUser.currentUser)
          .subscribe(async (currentUser: User) => {
            this.currentUser = cloneDeep(currentUser);
              await this.setTeamsList();
          }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngDoCheck() {
    const change = this.differ.diff(this.model);
    if (change) {
      change.forEachChangedItem(async (item) => {
        if (item.key === `teamId` && item.currentValue !== item.previousValue) {
          this.playersList = await this.apiService.getTeamMembers(this.model.teamId);
        }
      });
    }
  }

  async getCurrentTournament() {
    this.tournament = await this.apiService.getTournamentById(this.tournamentId);
  }

  async setTeamsList() {
    const res = await this.apiService.getUserTeams(this.currentUser.userId);
    this.teamsList.push(...res);
  }

  async onSubmit() {
    this.model.roster =
      this.model.roster.map(
        (value) => ({
            username: value.user.username,
            playerId: value.playerId,
         }));
    this.model.subs = this.model.subs.map(
      (value) => ({
          username: value.user.username,
          playerId: value.playerId,
       }));

    const response = await this.apiService.registerTeamForTournament(this.model, this.tournamentId);

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

  search(event: any) {
    const res = this.playersList.filter((player) =>
      player.summonerName.toLowerCase().startsWith(event.query.toLowerCase())
    );
    this.results = res;
  }
}
