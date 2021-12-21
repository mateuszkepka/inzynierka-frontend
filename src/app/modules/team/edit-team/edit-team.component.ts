import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTeamInput, UpdateTeamInput, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-edit-team`,
  templateUrl: `./edit-team.component.html`,
  styleUrls: [`./edit-team.component.scss`]
})
export class EditTeamComponent implements OnInit, OnDestroy {
  currentUser: User;
  form = new FormGroup({});
  faUserFriends = faUserFriends;
  userAccounts: any[] = [];
  teamId: number;

  subscriptions: Subscription[] = [];

  model: UpdateTeamInput = {
    teamName: undefined,
    captainId: undefined,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: `teamName`,
      type: `input`,
      templateOptions: {
        label: `Name of your team`,
        placeholder: `Enter name of your team`,
        required: true,
      }
    },
    {
      key: `captainId`,
      type: `dropdown`,
      templateOptions: {
        label: `Select your account`,
        placeholder: `Select account`,
        showClear: true,
        options: this.userAccounts,
        optionLabel: `summonerName`,
        optionValue: `playerId`,
        modelField: `captainId`
      }
    },
    {
      key: `torunamentBackgroundTheme`,
      type: `fileUpload`,
      templateOptions: {
        label: `Upload tournament background theme`,
      }
    },
    {
      key: `torunamentLogo`,
      type: `fileUpload`,
      templateOptions: {
        label: `Upload tournament logo`,
      }
    }
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.teamId = Number(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select(state => state.currentUser.currentUser)
        .subscribe(async (currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          await this.setUserAccounts();
          await this.getTeamData();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  async getTeamData() {
    const team = await this.apiService.getTeamById(this.teamId);
    const captain = await this.apiService.getPlayerById(team.captainId);
    this.model.captainId = captain.playerId;
    this.model.teamName = team.teamName;
    this.model = cloneDeep(this.model);
  }

  async onSubmit() {
    const response = await this.apiService.updateTeam(this.teamId, this.model);

    if (response.ok) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been created.`
      });
      void this.router.navigate([`/profile/${this.currentUser.userId}`]);
      return;
    }
    this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error!`,
      detail: `Something went wrong.`
    });
  }

  async setUserAccounts() {
    const result = await this.apiService.getUserAccounts(this.currentUser.userId);
    result.forEach((value) => this.userAccounts.push(value));
  }
}
