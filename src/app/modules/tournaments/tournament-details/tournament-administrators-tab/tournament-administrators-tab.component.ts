import { ActivatedRoute, Router } from '@angular/router';
import { Component, DoCheck, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Tournament, TournamentAdmin, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { TournamentAdministratorsTabModalComponent } from './tournament-administrators-tab-modal/tournament-administrators-tab-modal.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-tournament-administrators-tab`,
  templateUrl: `./tournament-administrators-tab.component.html`,
  styleUrls: [`./tournament-administrators-tab.component.scss`],
  providers: [DialogService]
})
export class TournamentAdministratorsTabComponent implements OnInit, OnDestroy, DoCheck {

  administratorsList: User[];
  tournamentId: number;
  currentTournament: Tournament;
  currentUser: User;

  subscriptions: Subscription[] = [];
  isVisible = false;
  isLoading = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    public dialogService: DialogService,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.listenOnCurrentUserChange();
    this.listenOnCurrentTournamentChange();
    await this.getAdministratorsList();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
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

  listenOnCurrentTournamentChange() {
    this.subscriptions.push(
      this.store
        .select((state) => state.tournament.tournament)
        .subscribe((tournament: Tournament) => {
          this.currentTournament = cloneDeep(tournament);
        })
    );
  }

  async getAdministratorsList() {
    this.isLoading = true;
    this.administratorsList = await this.apiService
      .getTournamentAdmins(this.tournamentId)
      .catch(() => {
        this.isLoading = false;
        return [];
      });
    this.isLoading = false;
    }

  navigateToAddAdmin() {
    void this.router.navigate([`tournaments/${this.tournamentId}/add-admin`]);
  }

  showModal(admin: User) {
    const ref = this.dialogService.open(
      TournamentAdministratorsTabModalComponent,
      {
        header: `Remove admin`,
      }
    );

    this.subscriptions.push(
      ref.onClose.subscribe(async (decision: boolean) => {
        if (decision) {
          await this.removeAdmin(admin);
        }
      })
    );
  }

  async removeAdmin(admin: User) {
    const removeAdminResponse = await this.apiService.removeAdmin(this.tournamentId, admin.userId).catch(() => false as const);

    let severity = `error`;
    let summary = `Error!`;
    let detail = `Something went wrong when removing admin! Try again.`;

    if (removeAdminResponse) {
      severity = `success`;
      summary = `Success!`;
      detail = `Admin has been removed`;
      await this.getAdministratorsList();
    }

    this.notificationsService.addNotification({
      severity,
      summary,
      detail
    });
  }
}
