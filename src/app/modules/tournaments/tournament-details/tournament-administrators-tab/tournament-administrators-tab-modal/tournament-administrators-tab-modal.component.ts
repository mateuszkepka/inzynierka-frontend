import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: `app-tournament-administrators-tab-modal`,
  templateUrl: `./tournament-administrators-tab-modal.component.html`,
  styleUrls: [`./tournament-administrators-tab-modal.component.scss`]
})
export class TournamentAdministratorsTabModalComponent {

  endDate: Date;
  reason: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  confirmRemoval(decision: boolean) {
    this.ref.close(decision);
  }

}
