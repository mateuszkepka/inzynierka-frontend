import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ParticipatingTeam } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-manage-torunament`,
  templateUrl: `./manage-torunament.component.html`,
  styleUrls: [`./manage-torunament.component.scss`]
})
export class ManageTorunamentComponent implements OnInit {

  tournamentId: number;
  participatingTeams: ParticipatingTeam[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.participatingTeams = await this.apiService.getPendingParticipatingTeams(this.tournamentId);
  }

  async acceptTeam(participatingTeamId: number) {
    const acceptTeamResponse = await this.apiService.acceptTeam(participatingTeamId).catch(() => false as const);

    if (!acceptTeamResponse) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Error while accepting a team!`
      });
      return;
    }

    this.participatingTeams.forEach((participatingTeam) => {
      if (participatingTeam.participatingTeamId === participatingTeamId) {
        this.notificationsService.addNotification({
          severity: `success`,
          detail: `Team ${participatingTeam.team.teamName} accepted sucessfully!`,
          summary: `Team accepted`
        });
        participatingTeam.isApproved = true;
        return;
      }
    });
  }

}
