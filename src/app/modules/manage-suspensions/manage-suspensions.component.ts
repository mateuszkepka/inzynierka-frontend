import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetSuspensionsParams, Suspension, SuspensionStatus, UpdateSuspensionInput, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ManageSuspensionModalComponent } from './manage-suspension-modal/manage-suspension-modal.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';
import { omit } from 'lodash';

@Component({
  selector: `app-manage-suspensions`,
  templateUrl: `./manage-suspensions.component.html`,
  styleUrls: [`./manage-suspensions.component.scss`],
  providers: [DialogService]
})
export class ManageSuspensionsComponent implements OnInit, OnDestroy {

  suspensions: Suspension[] = [];
  filters: GetSuspensionsParams = {};
  subscriptions: Subscription[] = [];

  statusOptions: { status: string; label: string }[];

  constructor(
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService,
    public dialogService: DialogService,
  ) { }

  async ngOnInit() {
    this.filters.status = SuspensionStatus.PAST;
    this.setStatusOptions();
    await this.getSuspensions();
  }

  ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  async getSuspensions() {
    this.suspensions = await this.apiService.getSuspensionsFiltered(this.filters);
    this.suspensions.forEach(async (suspension) => {
      const currentUser = await this.apiService.getUserById(suspension.userId);
      suspension.username = currentUser.username;
    });
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(SuspensionStatus).map((key) => ({
      status: SuspensionStatus[key],
      label: this.toProperCase(SuspensionStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  showModal(suspension: Suspension) {
    const ref = this.dialogService.open(ManageSuspensionModalComponent, { header: `Update suspension`, data: { suspension }});

    this.subscriptions.push(
      ref.onClose.subscribe(async (updateSuspensionInput: UpdateSuspensionInput) => {
        if (updateSuspensionInput) {
          await this.updateSuspension(updateSuspensionInput);
        }
      })
    );
  }

  async updateSuspension(updateSuspensionInput: UpdateSuspensionInput) {
    const suspensionId = updateSuspensionInput.suspensionId;
    const res = await this.apiService.updateSuspension(omit(updateSuspensionInput, [`suspensionId`]), suspensionId);

    let summary = `Success!`;
    let detail = `Suspension has been updated`;
    let severity = `success`;

    if (!res) {
      severity = `error`;
      summary = `Error!`;
      detail = `Something went wrong when sending report! Try again.`;
    }

    this.notificationsService.addNotification({
      severity,
      summary,
      detail
    });

    if (res) {
      await this.getSuspensions();
    }
  }

}
