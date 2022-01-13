import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { GetUserTournamentsParams, Tournament, TournamentRoles, TournamentStatus, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: `app-profile-tournaments`,
  templateUrl: `./profile-tournaments.component.html`,
  styleUrls: [`./profile-tournaments.component.scss`]
})
export class ProfileTournamentsComponent implements OnInit, DoCheck {
  @Input() currentUser: User;

  userTournaments: Tournament[] = [];
  userId: number;

  rolesOptions: { role: string; label: string }[];
  statusOptions: { status: string; label: string }[];

  isLoading = false;
  isVisible = false;

  searchParams: GetUserTournamentsParams = {
    role: TournamentRoles.PLAYER,
    status: TournamentStatus.PAST
  };

  constructor(
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.setRolesOptions();
    this.setStatusOptions();
    await this.loadUserTournaments();
  }

  ngDoCheck() {
      this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async loadUserTournaments() {
    this.isLoading = true;
    this.userTournaments = await this.apiService.getUserTournaments(this.userId, this.searchParams)
      .catch(() =>  {
        this.isLoading = false;
        return [];
      }
    );
    this.isLoading = false;
    console.log(this.userTournaments);
  }

  setRolesOptions() {
    this.rolesOptions = Object.keys(TournamentRoles).map((key) => ({
      role: TournamentRoles[key],
      label: this.toProperCase(TournamentRoles[key])
    }));
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(TournamentStatus).map((key) => ({
      status: TournamentStatus[key],
      label: this.toProperCase(TournamentStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }
}
