import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTournamentInput, Format, Tournament, UpdateTournamentInput } from 'src/app/shared/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';
import { differenceInMilliseconds } from 'date-fns';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { omit } from 'lodash';

@Component({
  selector: `app-tournament-edit`,
  templateUrl: `./tournament-edit.component.html`,
  styleUrls: [`./tournament-edit.component.scss`]
})
export class TournamentEditComponent implements OnInit, OnDestroy {

  nowDate = new Date();
  currentTournament: Tournament;
  tournamentId: number;

  subscriptions: Subscription[] = [];
  gamePresets: Format[] = [];

  faTrophy: IconDefinition = faTrophy;

  avatarFormData = new FormData();
  backgroundFormData = new FormData();

  mapsNumbers = [
    {
        value: 1
    },
    {
        value: 3
    },
    {
        value: 5
    },
  ];

  numberOfTeams = [
      {
          value: 2
      },
      {
          value: 4
      },
      {
          value: 8
      },
      {
          value: 16
      },
      {
          value: 32
      },
      {
          value: 64
      },
      {
          value: 128
      },
      {
          value: 256
      },
  ];

  differenceInMilliseconds = differenceInMilliseconds;

  form = new FormGroup({
    name: new FormControl(``, [Validators.required]),
    numberOfPlayers: new FormControl(null, [Validators.required]),
    numberOfTeams: new FormControl(null, [Validators.required]),
    numberOfMaps: new FormControl(null, [Validators.required]),
    registerStartDate: new FormControl(``, [Validators.required]),
    registerEndDate: new FormControl(``, [Validators.required]),
    tournamentStartDate: new FormControl(``, [Validators.required]),
    endingHour: new FormControl(null, [Validators.required]),
    description: new FormControl(``, [Validators.required]),
    format: new FormControl(``, [Validators.required]),
    // prize: new FormGroup({
    //     currency: new FormControl(``, [Validators.required]),
    //     distribution: new FormControl(``, [Validators.required]),
    // }),
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.tournamentId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.getGamePresets();
    await this.getCurrentTournament();
  }

  async onSubmit() {
    const requestBody = {
        ...omit(this.form.value, [`endingHour`, `numberOfMaps`, `endingMinutes`, `format`]),
        // endingHour: this.form.value.endingHour.getHours(),
        // endingMinutes: this.form.value.endingHour.getMinutes(),
    };
    const response = await this.apiService.updateTournament(requestBody as UpdateTournamentInput, this.tournamentId);

    if (response.ok) {
        this.notificationsService.addNotification({
            severity: `success`,
            summary: `Success!`,
            detail: `Tournament has been updated.`
        });

        void this.router.navigate([`/tournaments/${this.tournamentId}`]);
        return;
    }

    this.notificationsService.addNotification({
        severity: `error`,
        summary: `Error!`,
        detail: response.statusText
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
    });
  }

  async getGamePresets() {
    this.gamePresets = await this.apiService.getFormats();
  }

  async getCurrentTournament() {
    this.currentTournament = await this.apiService.getTournamentById(this.tournamentId);
    const endingHour = new Date();
    endingHour.setHours(this.currentTournament.endingHour);
    endingHour.setMinutes(this.currentTournament.endingMinutes);
    endingHour.setSeconds(0);
    endingHour.setMilliseconds(0);

    this.form.setValue({
      name: this.currentTournament.name,
      numberOfPlayers: this.currentTournament.numberOfPlayers,
      numberOfTeams: this.currentTournament.numberOfTeams,
      numberOfMaps: this.currentTournament.numberOfMaps,
      registerStartDate: new Date(this.currentTournament.registerStartDate),
      registerEndDate: new Date(this.currentTournament.registerEndDate),
      tournamentStartDate: new Date(this.currentTournament.tournamentStartDate),
      endingHour,
      description: this.currentTournament.description,
      format: this.currentTournament.format,
    });
  }

  selectAvatar(event: any) {
    this.avatarFormData.append(`image`, event.currentFiles[0]);
  }

  removeAvatar() {
      this.avatarFormData.delete(`image`);
  }

  selectBackgroundImage(event: any) {
      this.backgroundFormData.append(`image`, event.currentFiles[0]);
  }

  removeBackgroundImage() {
      this.backgroundFormData.delete(`image`);
  }

  async sendImages() {
    await this.sendAvatar();
    await this.sendBackground();
}

  async sendAvatar() {
    if (!this.avatarFormData.has(`image`)) {
        return;
    }
    const sendAvatarResponse = await this.apiService.uploadTournamentAvatar(this.avatarFormData, this.tournamentId);
    let severity = `success`;
    let detail = `Avatar has been uploaded!`;
    let summary = `Success!`;

    if (!sendAvatarResponse.ok) {
        severity = `error`;
        detail = sendAvatarResponse.statusText;
        summary = `Error while uploading avatar`;
    }

    this.showNotification(severity, detail, summary);
  }

  async sendBackground() {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService
        .uploadTournamentBackground(this.backgroundFormData, this.tournamentId);
      let severity = `success`;
      let detail = `Background has been uploaded!`;
      let summary = `Success!`;

      if (!sendBackgroundResponse.ok) {
          severity = `error`;
          detail = sendBackgroundResponse.statusText;
          summary = `Error while uploading background`;
      }

      this.showNotification(severity, detail, summary);
  }

  showNotification(severity: string, detail: string, summary: string) {
    this.notificationsService.addNotification({severity, summary, detail});
  }
}
