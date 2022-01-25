import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: `app-match-change-date-modal`,
  templateUrl: `./match-change-date-modal.component.html`,
  styleUrls: [`./match-change-date-modal.component.scss`]
})
export class MatchChangeDateModalComponent implements OnInit {

  newMatchDate: Date;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.newMatchDate = new Date(this.config.data.matchStartDate);
  }

  confirmChange() {
    this.ref.close(this.newMatchDate);
  }

}
