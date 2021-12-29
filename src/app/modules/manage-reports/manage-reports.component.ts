import { Component, OnInit } from '@angular/core';
import { Report, ReportStatus } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: `app-manage-reports`,
  templateUrl: `./manage-reports.component.html`,
  styleUrls: [`./manage-reports.component.scss`]
})
export class ManageReportsComponent implements OnInit {

  reportsList: Report[] = [];

  statusOptions: { status: string; label: string }[];

  status = ReportStatus.REVIEWED;
  isLoading = false;

  constructor(
    private readonly apiService: ApiService,
  ) { }

  async ngOnInit() {
    this.setStatusOptions();
    await this.getReportsList();
  }

  async getReportsList() {
    this.reportsList = await this.apiService.getReportsFiltered({ status: this.status }).catch(() =>  []);
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(ReportStatus).map((key) => ({
      status: ReportStatus[key],
      label: this.toProperCase(ReportStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }
}
