import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateSuspensionInput, Report, ReportStatus } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { CreateSuspensionModalComponent } from '../create-suspension-modal/create-suspension-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: `app-manage-report-details`,
  templateUrl: `./manage-report-details.component.html`,
  styleUrls: [`./manage-report-details.component.scss`],
  providers: [DialogService]
})
export class ManageReportDetailsComponent implements OnInit, OnDestroy {
  report: Report | false;
  reportId: number;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    public dialogService: DialogService,
    private readonly notificationsService: NotificationsService
  ) {
    this.reportId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.getReportById();
  }

  ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  async getReportById() {
    this.report =
      await this.apiService.getReportById(this.reportId)
        .catch(() => {
          void this.router.navigate([`/manage-reports`]);
            return false as const;
        });
    if (this.report && this.report.status === ReportStatus.UNSEEN) {
      await this.setReportStatus(ReportStatus.REVIEWED);
    }
  }

  async setReportStatus(reportStatus: string) {
    const res = await this.apiService.updateReport(reportStatus, this.reportId);

    if (res) {
      (this.report as Report).status = reportStatus;
      return res;
    }
  }

  showModal() {
    const ref = this.dialogService.open(
      CreateSuspensionModalComponent,
      {
        header: `Create suspension`,
        data: {
          userId: (this.report as Report).reportedUser.userId
        }
      }
    );

    this.subscriptions.push(
      ref.onClose.subscribe(async (suspensionData: CreateSuspensionInput) => {
        if (suspensionData) {
          await this.sendReport(suspensionData);
        }
      })
    );
  }

  async sendReport(suspensionData: CreateSuspensionInput) {
    const createSuspensionResponse = await this.apiService.createSuspension(suspensionData).catch(() => false as const);
    const statusChangeResponse = await this.setReportStatus(ReportStatus.RESOLVED).catch(() => false as const);

    let severity = `error`;
    let summary = `Error!`;
    let detail = `Something went wrong when creating suspension! Try again.`;

    if (createSuspensionResponse && statusChangeResponse) {
      severity = `success`;
      summary = `Success!`;
      detail = `Suspension has been created`;

      (this.report as Report).status = ReportStatus.RESOLVED;
    }

    this.notificationsService.addNotification({
      severity,
      summary,
      detail
    });

    if (createSuspensionResponse && statusChangeResponse) {
      void this.router.navigate([`/manage-reports`]);
    }
  }

}
