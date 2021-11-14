import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTeamInput, Player, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-create-team`,
  templateUrl: `./create-team.component.html`,
  styleUrls: [`./create-team.component.scss`]
})
export class CreateTeamComponent implements OnInit, OnDestroy {

  currentUser: User;
  form = new FormGroup({});
  faUserFriends = faUserFriends;
  userAccounts: any[] = [];

  subscriptions: Subscription[] = [];

  model: CreateTeamInput = {
    name: undefined,
    playerId: undefined,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: `name`,
      type: `input`,
      templateOptions: {
        label: `Name of your team`,
        placeholder: `Enter name of your team`,
        required: true,
      }
    },
    {
      key: `playerId`,
      type: `dropdown`,
      templateOptions: {
        label: `Select your account`,
        placeholder: `Select account`,
        showClear: true,
        options: this.userAccounts,
        optionLabel: `name`,
        optionValue: `playerId`,
        modelField: `playerId`
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
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select(state => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          this.setUserAccounts();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async onSubmit() {
    const response = await this.apiService.createTeam(this.model);

    console.log(response);
    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been created.`
      });
      void this.router.navigate([`/profile`]);
      return;
    }
    this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error!`,
      detail: `Something went wrong.`
    });
  }

  setUserAccounts() {
    this.currentUser.accounts.forEach((account) => {
      this.userAccounts.push({
        name: account.summonerId,
        playerId: account.playerId,
      });
    });
  }
}
