import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-details-edit`,
  templateUrl: `./profile-details-edit.component.html`,
  styleUrls: [`./profile-details-edit.component.scss`]
})
export class ProfileDetailsEditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  form = new FormGroup({});
  currentUser: User;

  avatarFormData = new FormData();
  backgroundFormData = new FormData();

  fields: FormlyFieldConfig[] =[
    {
      key: `username`,
      type: `input`,
      templateOptions: {
        label: `Username`,
        placeholder: `Enter your username`,
        required: true,
      }
    },
    {
      key: `email`,
      type: `input`,
      templateOptions: {
        label: `E-mail address`,
        placeholder: `Enter your email`,
        required: true,
      }
    },
    {
      key: `country`,
      type: `input`,
      templateOptions: {
        label: `Country`,
        placeholder: `Enter your country`,
        required: true,
      }
    },
    {
      key: `university`,
      type: `input`,
      templateOptions: {
        label: `University`,
        placeholder: `Enter your university`
      }
    },
    {
      key: `studentId`,
      type: `input`,
      templateOptions: {
        label: `Student ID`,
        placeholder: `Enter your student ID`
      }
    },
  ];

  constructor(
    public activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async onSubmit() {
    const response = await this.apiService.patchUser(this.currentUser);
    if (response) {
      this.store.dispatch(new SetCurrentUser(response));
      this.notificationsService.addNotification({severity: `success`, summary: `Success!`, detail: `Your data has been updated.`});
      return;
    }
    this.notificationsService.addNotification({severity: `error`, summary: `Error!`, detail: `An error occurred.`});
  }

  async sendAvatar() {
    if (!this.avatarFormData.has(`image`)) {
        return;
    }
    const sendAvatarResponse = await this.apiService.uploadUserAvatar(this.avatarFormData, this.currentUser);
    let severity = `success`;
    let detail = `Avatar has been uploaded!`;
    let summary = `Success!`;

    if (!sendAvatarResponse.ok) {
        severity = `error`;
        detail = sendAvatarResponse.statusText;
        summary = `Error while uploading avatar`;
    }
    this.showNotification(severity, detail, summary);

    if (sendAvatarResponse.ok) {
      this.store.dispatch(new SetCurrentUser(sendAvatarResponse.body as User));
      void this.router.navigate([{outlets: { profileDetails: [] }}], { relativeTo: this.activatedRoute.parent });
    }
  }

  async sendBackground() {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService.uploadUserBackground(this.backgroundFormData, this.currentUser);
      let severity = `success`;
      let detail = `Background has been uploaded!`;
      let summary = `Success!`;

      if (!sendBackgroundResponse.ok) {
          severity = `error`;
          detail = sendBackgroundResponse.statusText;
          summary = `Error while uploading background`;
      }

      this.showNotification(severity, detail, summary);

      if (sendBackgroundResponse.ok) {
        this.store.dispatch(new SetCurrentUser(sendBackgroundResponse.body as User));
        void this.router.navigate([{outlets: { profileDetails: [] }}], { relativeTo: this.activatedRoute.parent });
      }
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

  showNotification(severity: string, detail: string, summary: string) {
    this.notificationsService.addNotification({severity, summary, detail});
  }
}
