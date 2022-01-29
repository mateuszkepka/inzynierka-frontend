import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { Match } from 'src/app/shared/interfaces/interfaces';
import { NotificationsService } from 'src/app/services/notifications.service';
import { isEqual } from 'lodash';

@Component({
  selector: `app-match-resolve`,
  templateUrl: `./match-resolve.component.html`,
  styleUrls: [`./match-resolve.component.scss`]
})
export class MatchResolveComponent implements OnInit {
  matchId: number;
  match: Match | false;
  isLoading = false;

  imagesFormData = new FormData();

  filesArray = [];

  matchesAmount: number[];
  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,

  ) {
    this.matchId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.match = await this.apiService.getMatchById(this.matchId).catch(() => false as const);
    this.setMatchesAmount();
  }

  setMatchesAmount() {
    if (this.match) {
      this.matchesAmount = Array(this.match.numberOfMaps).fill(1);
    }
  }

  selectMatchResult(event: any) {
    this.filesArray.push(event.currentFiles[0]);
  }

  removeMatchResult(event: any) {
    if (this.filesArray.some((value) => isEqual(value, event.file))) {
      const index = this.filesArray.indexOf(event.file);
      this.filesArray.splice(index, 1);
    }
  }

  async sendResults() {
    this.isLoading = true;
    this.filesArray.forEach((file) => {
      this.imagesFormData.append(`image[]`, file);
    });
    let severity = `success`;
    let summary = `Results uploaded`;
    let detail = `You have sucessfully uploaded match results`;

    const res = await this.apiService
      .resolveMatch(this.imagesFormData, this.matchId)
      .catch((err) => {
          severity = `error`;
          summary = `Error while uploading images`;
          detail = `${err.error.message}`;
          this.notificationsService.addNotification({severity, summary, detail});
          this.isLoading = false;
      });
    if (res) {
      this.notificationsService.addNotification({severity, summary, detail});
      this.isLoading = false;
      void this.router.navigate([`/matches`, this.matchId]);
      return;
    };

  }

}
