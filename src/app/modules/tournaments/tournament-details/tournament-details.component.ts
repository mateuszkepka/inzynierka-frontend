import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tournament, TournamentTeam, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetTournament } from 'src/app/state/tournament.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { differenceInMilliseconds } from 'date-fns';

@Component({
  selector: `app-tournament-details`,
  templateUrl: `./tournament-details.component.html`,
  styleUrls: [`./tournament-details.component.scss`]
})
export class TournamentDetailsComponent implements OnInit, OnDestroy {

  tournament: Tournament;
  tournamentId: number;
  tournamentTeams: TournamentTeam[] = [];
  checkedIn: number;
  isRegistrationActive = false;
  isCheckInActive = false;

  currentUser: User;
  subscriptions: Subscription[] = [];

  avatarToShow: any;
  backgroundToShow: any;
  isAvatarLoading = false;
  isBackgroundLoading = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService,
  ) {
    this.tournamentId = this.activatedRoute.snapshot.params?.id;
  }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    this.tournament = await this.apiService.getTournamentById(this.tournamentId);
    await this.getTournamentTeams();
    this.setCheckedIn();
    this.setIsRegistrationActive();
    this.setIsCheckInActive();
    this.store.dispatch(new SetTournament(this.tournament));
    await this.getImages();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }

  setCheckedIn() {
    const checkedInTeams = this.tournamentTeams.filter((team) => team.status === `checked`);
    this.checkedIn = checkedInTeams.length;
  }

  async sendCheckInRequest() {
    const userAccounts = await this.apiService.getUserAccounts(this.currentUser.userId);
    const userTeams = await this.apiService.getUserTeams(this.currentUser.userId);

    const accountsIds = userAccounts.map((value) => value.playerId);
    const promises = userTeams.filter(async (value) => {
      const team = await this.apiService.getTeamById(value.teamId);

      if (accountsIds.includes(team.captainId)) {
        return value;
      }
    });
    const ownedTeams = await Promise.all(promises);
    const ownedTeamsIds = ownedTeams.map((value) => value.teamId);

    const foundTournamentTeam = this.tournamentTeams.find((value) => ownedTeamsIds.includes(value.team.teamId));

    const res = await this.apiService.checkInTorunament(this.tournamentId, foundTournamentTeam.team.teamId);

    if (res.ok) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Checked in!`,
        detail: `You have successfully checked in ${foundTournamentTeam.team.teamName}!`
      });
      await this.getTournamentTeams();
      return;
    }
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  setIsRegistrationActive() {
    if (!this.currentUser) {
      return false;
    }
    const now = new Date();
    const registerStartDate = new Date(this.tournament.registerStartDate);
    const registerEndDate = new Date(this.tournament.registerEndDate);

    const diffStart = differenceInMilliseconds(now, registerStartDate);
    const diffEnd = differenceInMilliseconds(now, registerEndDate);


    this.isRegistrationActive = diffStart > 0 && diffEnd < 0 && this.checkedIn !== this.tournament.numberOfTeams;
  }

  setIsCheckInActive() {
    if (!this.currentUser) {
      return false;
    }
    const now = new Date();
    const checkInOpenDate = new Date(this.tournament.checkInOpenDate);
    const checkInCloseDate = new Date(this.tournament.checkInCloseDate);

    const diffStart = differenceInMilliseconds(now, checkInOpenDate);
    const diffEnd = differenceInMilliseconds(now, checkInCloseDate);

    this.isCheckInActive = diffStart > 0 && diffEnd < 0;
  }

  async getTournamentTeams() {
    this.tournamentTeams = await this.apiService.getTournamentTeams(this.tournamentId).catch(() => []);
  }

  getImages() {
    this.getAvatar();
    this.getBackground();
  }

  getAvatar() {
    this.isAvatarLoading = true;
    this.apiService
      .getUploadedTournamentAvatar(this.tournament.profilePicture)
      .subscribe(data => {
        this.createImageFromBlob(data, `avatarToShow`);
        this.isAvatarLoading = false;
      },
      () =>{
        this.isAvatarLoading = false;
      });
  }

  getBackground() {
    this.isBackgroundLoading = true;
    this.apiService
      .getUploadedTournamentBackground(this.tournament.backgroundPicture)
      .subscribe(data => {
        this.createImageFromBlob(data, `backgroundToShow`);
        this.isBackgroundLoading = false;
      },
      () => {
        this.isBackgroundLoading = false;
      });
  }

  createImageFromBlob(image: Blob, field: string) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
       this[field] = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
