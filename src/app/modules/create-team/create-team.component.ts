import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTeamInput, Player, Team, User } from 'src/app/shared/interfaces/interfaces';

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

  avatarFormData = new FormData();
  backgroundFormData = new FormData();

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
        optionLabel: `summonerName`,
        optionValue: `playerId`,
        modelField: `playerId`
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
    this.subscriptions.push(
      this.store
        .select(state => state.currentUser.currentUser)
        .subscribe(async (currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          await this.setUserAccounts();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async onSubmit() {
    const response = await this.apiService.createTeam(this.model)
    .catch((err) => {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Error!`,
        detail: `${err.error.message}`
      });
    })
    ;

    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been created.`
      });
      await this.sendImages(response);
      void this.router.navigate([`/team/${response.teamId}`]);
    }
  }

  async setUserAccounts() {
    const result = await this.apiService.getUserAccounts(this.currentUser.userId).catch(() => []);
    result.forEach((value) => this.userAccounts.push(value));
  }

  selectAvatar(event: any) {
    this.avatarFormData.append(`image`, event.currentFiles[0]);
  }

  removeAvatar() {
      this.avatarFormData.delete(`image`);
  }

  selectBackgroundImage(event: any) {
      this.backgroundFormData.append(`image`, event.currentFiles[0]);
  }

  removeBackgroundImage() {
      this.backgroundFormData.delete(`image`);
  }

  async sendImages(createdTeam) {
    await this.sendAvatar(createdTeam);
    await this.sendBackground(createdTeam);
}

  async sendAvatar(createdTeam: Team) {
    if (!this.avatarFormData.has(`image`)) {
        return;
    }
    const sendAvatarResponse = await this.apiService
      .uploadTeamAvatar(this.avatarFormData, createdTeam.teamId)
      .catch((err) => {
        const severity = `error`;
        const detail = `${err.error.message}`;
        const summary = `Error while uploading avatar`;
        this.showNotification(severity, detail, summary);

      });

    if (sendAvatarResponse) {
      const severity = `success`;
      const detail = `Avatar has been uploaded!`;
      const summary = `Success!`;
      this.showNotification(severity, detail, summary);
    }

  }

  async sendBackground(createdTeam: Team) {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService
        .uploadTeamBackground(this.backgroundFormData, createdTeam.teamId)
        .catch((err) => {
          const severity = `error`;
          const detail = `${err.error.message}`;
          const summary = `Error while uploading avatar`;
          this.showNotification(severity, detail, summary);

        });

      if (sendBackgroundResponse) {
        const severity = `success`;
        const detail = `Background has been uploaded!`;
        const summary = `Success!`;
        this.showNotification(severity, detail, summary);
      }

  }

  showNotification(severity: string, detail: string, summary: string) {
    this.notificationsService.addNotification({severity, summary, detail});
  }
}
