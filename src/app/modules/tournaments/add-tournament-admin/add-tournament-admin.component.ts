import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tournament, User } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-add-tournament-admin`,
  templateUrl: `./add-tournament-admin.component.html`,
  styleUrls: [`./add-tournament-admin.component.scss`]
})
export class AddTournamentAdminComponent implements OnInit {

  faUsers: IconDefinition = faUsers;
  adminsList: User[] = [];
  usersList: User[] = [];
  results: User[] = [];

  currentTournament: Tournament;
  tournamentId: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
  ) {
    this.tournamentId = this.activatedRoute.snapshot.params.id;
  }

  async ngOnInit() {
    await this.getCurrentTournament();
    await this.getAllUsers();
  }

  async getCurrentTournament() {
    this.currentTournament = await this.apiService.getTournamentById(this.tournamentId);
  }

  async getAllUsers() {
    // TODO get all users
    const user = await this.apiService.getUserById(1);
    this.usersList.push(user);
  }

  search(event: any) {
    const res = this.usersList.filter((user) =>
      user.username.toLowerCase().startsWith(event.query.toLowerCase())
    );
    this.results = res;
  }

  onSubmit() {
    if (!this.adminsList.length) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `No player selected`,
        detail: `Please select at least one player`,
      });
      return;
    }
    this.adminsList.forEach(async (user) => {
      const invitationResult = await this.apiService.createTournamentAdmin(this.tournamentId, user.userId);

      if (invitationResult) {
        this.notificationsService.addNotification({
          severity: `success`,
          summary: `Admin added successfully`,
          detail: `Player '${user.username}' has been added as admin`,
        });
        return;
      }
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Admin not added, please try again`,
      });
    });

    void this.router.navigate([`/tournaments/${this.currentTournament.tournamentId}`]);
  }

}
