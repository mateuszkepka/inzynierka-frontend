import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: `app-profile-report-modal`,
  templateUrl: `./profile-report-modal.component.html`,
  styleUrls: [`./profile-report-modal.component.scss`]
})
export class ProfileReportModalComponent {

  reportReason: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  confirmReport(reportReason: string) {
    this.ref.close(reportReason);
  }
}
