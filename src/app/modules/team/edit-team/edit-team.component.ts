import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTeamInput, Team, UpdateTeamInput, User } from 'src/app/shared/interfaces/interfaces';

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

  avatarFormData = new FormData();
  backgroundFormData = new FormData();

  subscriptions: Subscription[] = [];

  model: UpdateTeamInput = {
    name: undefined,
    captainId: undefined,
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
      key: `captainId`,
      type: `dropdown`,
      templateOptions: {
        label: `Select captain`,
        placeholder: `Select account`,
        showClear: true,
        options: this.userAccounts,
        optionLabel: `summonerName`,
        optionValue: `playerId`,
        modelField: `captainId`
      }
    },
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
          await this.setTeamMembers();
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
    this.model.name = team.teamName;
    this.model = cloneDeep(this.model);
  }

  async onSubmit() {
    const response = await this.apiService
      .updateTeam(this.teamId, this.model)
      .catch((err) => {
        this.notificationsService.addNotification({
          severity: `error`,
          summary: `Error!`,
          detail: `${err.error.message}`
        });
      });

    if (response) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been updated.`
      });

      await this.sendImages(response);
      void this.router.navigate([`/team/${this.teamId}`]);
      return;
    }

  }

  async setTeamMembers() {
    const result = await this.apiService.getTeamMembers(this.teamId).catch(() => []);
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
    const sendAvatarResponse = await this.apiService.uploadTeamAvatar(this.avatarFormData, this.teamId)
      .catch((err) => {
        const errSeverity = `error`;
        const errDetail = `${err.error.message}`;
        const errSummary = `Error while uploading avatar`;
        this.showNotification(errSeverity, errDetail, errSummary);
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
      const sendBackgroundResponse = await this.apiService.uploadTeamBackground(this.backgroundFormData, this.teamId)
      .catch((err) => {
        const errSeverity = `error`;
        const errDetail = `${err.error.message}`;
        const errSummary = `Error while uploading background`;
        this.showNotification(errSeverity, errDetail, errSummary);
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
