import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Match } from 'src/app/shared/interfaces/interfaces';
import { isEqual } from 'lodash';

@Component({
  selector: `app-match-resolve`,
  templateUrl: `./match-resolve.component.html`,
  styleUrls: [`./match-resolve.component.scss`]
})
export class MatchResolveComponent implements OnInit {
  matchId: number;
  match: Match;

  imagesFormData = new FormData();

  filesArray = [];

  matchesAmount: number[];
  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.matchId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.match = await this.apiService.getMatchById(this.matchId);
    this.setMatchesAmount();
  }

  setMatchesAmount() {
    this.matchesAmount = Array(this.match.numberOfMaps).fill(1);
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
    this.filesArray.forEach((file) => {
      this.imagesFormData.append(`image[]`, file);
    });

    const res = await this.apiService.resolveMatch(this.imagesFormData, this.matchId);

    console.log(res);
  }

}
