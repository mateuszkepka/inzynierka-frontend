import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: `app-create-suspension-modal`,
  templateUrl: `./create-suspension-modal.component.html`,
  styleUrls: [`./create-suspension-modal.component.scss`]
})
export class CreateSuspensionModalComponent {

  endDate: Date;
  reason: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  confirmReport(endDate: Date, reason: string) {
    this.ref.close({ userId: this.config.data.userId, endDate: endDate.toISOString(), reason });
  }
}
