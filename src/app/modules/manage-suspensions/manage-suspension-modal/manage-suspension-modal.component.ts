import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { UpdateSuspensionInput } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-manage-suspension-modal`,
  templateUrl: `./manage-suspension-modal.component.html`,
  styleUrls: [`./manage-suspension-modal.component.scss`]
})
export class ManageSuspensionModalComponent implements OnInit {

  todayDate: Date;

  suspensionData: UpdateSuspensionInput = {
    endDate: undefined,
    reason: undefined,
    suspensionId: undefined,
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.todayDate = new Date();
    this.suspensionData.endDate = new Date(this.config.data.suspension.endDate);
    this.suspensionData.reason = this.config.data.suspension.reason;
    this.suspensionData.suspensionId = this.config.data.suspension.suspensionId;
  }

  confirmReport(suspensionData: UpdateSuspensionInput) {
    this.ref.close(suspensionData);
  }

}
