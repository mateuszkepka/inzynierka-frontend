import { Component, OnInit } from '@angular/core';
import { ParticipatingTeam, ParticipationStatus, Team, TournamentTeam } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: `app-manage-torunament`,
  templateUrl: `./manage-torunament.component.html`,
  styleUrls: [`./manage-torunament.component.scss`]
})
export class ManageTorunamentComponent implements OnInit {

  tournamentId: number;
  participatingTeams: TournamentTeam[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.participatingTeams = await this.apiService.getTournamentTeams(this.tournamentId, ParticipationStatus.SIGNED).catch(() => []);
  }

  async acceptTeam(participatingTeam: TournamentTeam, status: string) {
    const acceptTeamResponse = await this.apiService.acceptTeam(
      this.tournamentId,
      participatingTeam.team.teamId,
      status
    )
    .catch(() => false as const);

    if (!acceptTeamResponse) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Error while accepting a team!`
      });
      return;
    }

    this.participatingTeams.forEach((value) => {
      if (value.participatingTeamId === participatingTeam.participatingTeamId) {
        this.notificationsService.addNotification({
          severity: `success`,
          detail: `Team ${participatingTeam.team.teamName} accepted sucessfully!`,
          summary: `Team accepted`
        });
        participatingTeam.status = status;
        participatingTeam = { ...participatingTeam };
        return;
      }
    });
  }

}
