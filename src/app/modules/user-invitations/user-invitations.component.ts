import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PlayerTeam } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-user-invitations`,
  templateUrl: `./user-invitations.component.html`,
  styleUrls: [`./user-invitations.component.scss`]
})
export class UserInvitationsComponent implements OnInit {

  pendingInvitations: PlayerTeam[] | undefined;

  constructor(
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService
  ) { }

  async ngOnInit() {
    await this.getPendingInvitations();
  }

  async getPendingInvitations() {
    this.pendingInvitations = await this.apiService.getPendingInvitations();
  }

  async acceptInvitation(invitation: PlayerTeam) {
    const res = await this.apiService.acceptPlayerInvitation(invitation.playerTeamId).catch(() => false as const);

    if (!res) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Please try again`
      });
      return;
    }

    invitation.isAccepted = true;
    this.notificationsService.addNotification({
      severity: `success`,
      summary: `Invitation accepted`,
      detail: `Now you are '${invitation.team.name}' player`
    });
  }
}
