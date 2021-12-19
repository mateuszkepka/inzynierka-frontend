import { Component, DoCheck, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Team, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-teams`,
  templateUrl: `./profile-teams.component.html`,
  styleUrls: [`./profile-teams.component.scss`]
})
export class ProfileTeamsComponent implements OnInit, OnDestroy, DoCheck {
  @Input() currentUser: User;
  currentlyLoggedUser: User;
  teamsList: Team[] = [];
  currentlyLoggedUserSub: Subscription;
  currentProfileId: number;

  isVisible = false;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.currentProfileId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.setTeamsList();
    this.listenOnCurrentlyLoggedUserChange();
  }

  ngOnDestroy() {
    this.currentlyLoggedUserSub.unsubscribe();
  }

  ngDoCheck() {
      this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async setTeamsList() {
    this.teamsList = await this.apiService.getUserTeams(this.currentProfileId).catch(() => []);
    console.log(this.teamsList);
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
}
