import { Component, OnInit } from '@angular/core';
import { Invitation, InvitationStatus, ResponseStatus } from 'src/app/shared/interfaces/interfaces';

import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: `app-user-invitations`,
  templateUrl: `./user-invitations.component.html`,
  styleUrls: [`./user-invitations.component.scss`]
})
export class UserInvitationsComponent implements OnInit {

  pendingInvitations: Invitation[] | undefined;

  constructor(
    private readonly apiService: ApiService,
    private readonly notificationsService: NotificationsService
  ) { }

  async ngOnInit() {
    await this.getPendingInvitations();
  }

  async getPendingInvitations() {
    this.pendingInvitations = await this.apiService.getPendingInvitations({ status: InvitationStatus.Pending });
  }

  async acceptInvitation(invitation: Invitation, status: ResponseStatus) {
    const res = await this.apiService.acceptPlayerInvitation(invitation.invitationId, status).catch(() => false as const);

    if (!res) {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Something went wrong`,
        detail: `Please try again`
      });
      return;
    }

    invitation.status = status;
    let summary = `Invitation accepted`;
    let detail = `Now you are '${invitation.teamName}' player`;

    if (status === ResponseStatus.Refused) {
      summary = `Invitation refused`;
      detail = `You have refused '${invitation.teamName}' invitation`;
    }

    this.notificationsService.addNotification({
      severity: `success`,
      summary,
      detail
    });
  }
}
