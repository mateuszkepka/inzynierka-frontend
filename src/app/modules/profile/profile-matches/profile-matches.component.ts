import { Component, DoCheck, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Match, MatchStatus, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-matches`,
  templateUrl: `./profile-matches.component.html`,
  styleUrls: [`./profile-matches.component.scss`]
})
export class ProfileMatchesComponent implements OnInit, OnDestroy, DoCheck {
  @Input() currentUser: User;
  currentlyLoggedUser: User;
  matchesList: Match[] = [];
  currentlyLoggedUserSub: Subscription;
  currentProfileId: number;

  statusOptions: { status: string; label: string }[];

  isLoading = false;
  isVisible = false;

  status: MatchStatus.SCHEDULED;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.currentProfileId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.setStatusOptions();
    await this.setMatchesList();
    this.listenOnCurrentlyLoggedUserChange();
  }

  ngOnDestroy() {
    this.currentlyLoggedUserSub.unsubscribe();
  }

  ngDoCheck() {
      this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async setMatchesList() {
    this.isLoading = true;
    this.matchesList =
      await this.apiService
        .getUserMatches(this.currentProfileId, this.status)
        .catch(() => {
          this.isLoading = false;
          return [];
        });

    this.isLoading = false;
  }

  listenOnCurrentlyLoggedUserChange() {
    this.currentlyLoggedUserSub =
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          if (currentUser) {
            this.currentlyLoggedUser = cloneDeep(currentUser);
          }
        });
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(MatchStatus).map((key) => ({
      status: MatchStatus[key],
      label: this.toProperCase(MatchStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

}
