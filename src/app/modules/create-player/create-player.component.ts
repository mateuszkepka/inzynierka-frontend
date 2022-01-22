/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { CreatePlayerInput, RegionsLoL } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
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
export class CreatePlayerComponent implements OnInit {

  form = new FormGroup({});

  regions = [];
  faHeadset = faHeadset;

  model: CreatePlayerInput = {
    summonerName: undefined,
    gameId: 1,
    region: undefined,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: `summonerName`,
      type: `input`,
      templateOptions: {
        label: `Summoner Name`,
        placeholder: `Enter your summoner name`,
        required: true,
      }
    },
    {
      key: `region`,
      type: `dropdown`,
      templateOptions: {
        label: `Region`,
        placeholder: `Enter your account region`,
        required: true,
        showClear: true,
        modelField: `region`,
        options: this.regions,
        optionLabel: `region`,
        optionValue: `region`,
      }
    },
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly store: Store,
  ) { }

  ngOnInit() {
    Object.keys(RegionsLoL).map((value) => (this.regions.push({ region: value })));
  }

  async onSubmit() {
    const response = await this.apiService.createPlayer(this.model)
    .catch((err) => {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Error!`,
        detail: `${err.error.message}`,
      });
    })
    ;

    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Your League of Legends account has been added.`
      });
      void this.router.navigate([`/user-accounts`]);
      return;
    }


  }
}
