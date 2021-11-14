/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { CreatePlayerInput } from 'src/app/shared/interfaces/interfaces';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-create-player`,
  templateUrl: `./create-player.component.html`,
  styleUrls: [`./create-player.component.scss`]
})
export class CreatePlayerComponent {

  form = new FormGroup({});

  faHeadset = faHeadset;

  model: CreatePlayerInput = {
    summonerId: undefined,
    PUUID: `0`,
    accountId: `0`,
    region: undefined,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: `summonerId`,
      type: `input`,
      templateOptions: {
        label: `Summoner Name`,
        placeholder: `Enter your summoner name`,
        required: true,
      }
    },
    {
      key: `region`,
      type: `input`,
      templateOptions: {
        label: `Region`,
        placeholder: `Enter your account region`,
        required: true,
      }
    },
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly store: Store,
  ) { }

  async onSubmit() {
    const response = await this.apiService.createPlayer(this.model);

    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Your League of Legends account has been added.`
      });
      const currentUser = await this.apiService.getMe();
      this.store.dispatch(new SetCurrentUser(currentUser));
      void this.router.navigate([`/user-accounts`]);
      return;
    }

    this.notificationsService.addNotification({
      severity: `error`,
      summary: `Error!`,
      detail: `Something went wrong`,
    });
  }
}
