import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Player, Team, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SetCurrentTeam } from 'src/app/state/current-team.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-team`,
  templateUrl: `./team.component.html`,
  styleUrls: [`./team.component.scss`]
})
export class TeamComponent implements OnInit {

  teamId: number;
  subscriptions: Subscription[] = [];
  team: Team;
  currentUser: User | undefined;
  currentUserAccounts: Player[] = [];
  showManageButtons = false;
  captain: Player;

  avatarToShow: any;
  backgroundToShow: any;
  isAvatarLoading = false;
  isBackgroundLoading = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    this.teamId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit(){
    this.team = await this.apiService.getTeamById(this.teamId);
    this.captain = await this.apiService.getPlayerById(this.team.captainId);
    this.store.dispatch(new SetCurrentTeam(this.team));
    this.listenOnCurrentUserChange();
    await this.getImages();
  }

  listenOnCurrentUserChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(async (currentUser: User | undefined) => {
          if (currentUser) {
            this.currentUser = cloneDeep(currentUser);
            await this.setCurrentUserAccounts();
            this.setShowManageButton();
          }
        })
    );
  }

  setShowManageButton() {
    this.showManageButtons = Boolean(this.currentUserAccounts.find((value) => value.playerId === this.captain.playerId));
  }

  async setCurrentUserAccounts() {
    if (!this.currentUser) {
      return;
    }
    this.currentUserAccounts = await this.apiService.getUserAccounts(this.currentUser.userId);
  }

  navigateToEditTeam() {
    void this.router.navigate([`/team`, this.teamId, `edit`]);
  }

  async deleteTeam() {
    const res = await this.apiService.deleteTeam(this.teamId)
      .catch((err) => {
        this.notificationsService.addNotification({
          severity: `error`,
          summary: `Error!`,
          detail: `${err.error.message}`
        });
      })
    ;

    if (res) {
      this.notificationsService.addNotification({
        severity: `success`,
        summary: `Success!`,
        detail: `Team has been deleted.`
      });
      void this.router.navigate([`/profile/${this.currentUser.userId}`]);
      return;
    }

  }

  getImages() {
    this.getAvatar();
    this.getBackground();
  }

  getAvatar() {
    this.isAvatarLoading = true;
    this.apiService
      .getUploadedTeamAvatar(this.team.profilePicture)
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
      .getUploadedTeamBackground(this.team.backgroundPicture)
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

  onTabChange() {
    window.scroll(0,0);
  }
}
