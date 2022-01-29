import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTournamentInput, Format, Tournament, UpdatePrizeInput, UpdateTournamentInput } from 'src/app/shared/interfaces/interfaces';
import { differenceInMilliseconds, parseISO } from 'date-fns';

import { ApiService } from 'src/app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';
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

  groupsMapsNumbers = [
    {
        value: 1
    },
    {
        value: 2,
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
  parseISO = parseISO;

  form = new FormGroup({
    name: new FormControl(``, [Validators.required]),
    numberOfPlayers: new FormControl(null, [Validators.required]),
    numberOfTeams: new FormControl(null, [Validators.required, this.teamsNumberValidator()]),
    numberOfMaps: new FormControl(null, [Validators.required]),
    registerStartDate: new FormControl(``, [Validators.required]),
    registerEndDate: new FormControl(``, [Validators.required]),
    tournamentStartDate: new FormControl(``, [Validators.required]),
    numberOfGroups: new FormControl(null, [this.groupsNumberValidator()]),
    endingHour: new FormControl(``, [Validators.required]),
    description: new FormControl(``, [Validators.required]),
    format: new FormControl(``, [Validators.required]),
  });

  prizeForm = new FormGroup({
    currency: new FormControl(null, [Validators.required]),
    distribution: new FormControl(null, [Validators.required]),
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
        ...omit(this.form.value, [`endingHour`, `formatId`]),
        endingHour: this.form.value.endingHour.getHours(),
        endingMinutes: this.form.value.endingHour.getMinutes(),
        format: this.form.value.formatId,

    };
    const response = await this.apiService.updateTournament(requestBody as UpdateTournamentInput, this.tournamentId)
    .catch((err) => {
      this.notificationsService.addNotification({
        severity: `error`,
        summary: `Error!`,
        detail: `${err.error.message}`
      });
    });

    if (response) {
        this.notificationsService.addNotification({
            severity: `success`,
            summary: `Success!`,
            detail: `Tournament has been updated.`
        });

        void this.router.navigate([`/tournaments/${this.tournamentId}`]);
        return;
    }


  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
    });
  }

  async getGamePresets() {
    this.gamePresets = await this.apiService.getFormats().catch(() => []);
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
      numberOfGroups: this.currentTournament.numberOfGroups,
      registerStartDate: new Date(this.currentTournament.registerStartDate),
      registerEndDate: new Date(this.currentTournament.registerEndDate),
      tournamentStartDate: new Date(this.currentTournament.tournamentStartDate),
      endingHour,
      description: this.currentTournament.description,
      format: this.currentTournament.formatId,
    });

    this.prizeForm.setValue({
      distribution: this.currentTournament.prize.distribution,
      currency: this.currentTournament.prize.currency,
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
    const sendAvatarResponse = await this.apiService.uploadTournamentAvatar(this.avatarFormData, this.tournamentId)
      .catch((err) => {
        const severity = `error`;
        const detail = `${err.error.message}`;
        const summary = `Error while uploading avatar`;
        this.showNotification(severity, detail, summary);
      });

    if (sendAvatarResponse) {
      const severity = `success`;
      const detail = `Avatar has been uploaded!`;
      const summary = `Success!`;
      this.showNotification(severity, detail, summary);
    }

  }

  async sendBackground() {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService
        .uploadTournamentBackground(this.backgroundFormData, this.tournamentId)
        .catch((err) => {
          const severity = `error`;
          const detail = `${err.error.message}`;
          const summary = `Error while uploading background`;
          this.showNotification(severity, detail, summary);
        });

      if (sendBackgroundResponse) {
        const severity = `error`;
        const detail = sendBackgroundResponse.statusText;
        const summary = `Error while uploading background`;
        this.showNotification(severity, detail, summary);
      }

  }

  showNotification(severity: string, detail: string, summary: string) {
    this.notificationsService.addNotification({severity, summary, detail});
  }

  async submitPrizeUpdate() {
    const response = await this.apiService.updatePrize(this.prizeForm.value as UpdatePrizeInput, this.tournamentId)
      .catch((err) => {
        this.notificationsService.addNotification({
            severity: `error`,
            summary: `Error!`,
            detail: `${err.error.message}`
        });

      });

    if (response) {
        this.notificationsService.addNotification({
            severity: `success`,
            summary: `Success!`,
            detail: `Prize has been updated.`
        });

        void this.router.navigate([`/tournaments/${this.tournamentId}`]);
        return;
    }

  }

  groupsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!this.form) {
            return;
        }
        if (this.form.value.format === `Single Elimination Ladder` || this.form.value.format === `Double Elimination Ladder`) {
            return;
        }
        const invalid = this.form.value.numberOfTeams % control.value !== 0 ;
        return invalid ? { numberOfGroups: { value: control.value } } : null;
    };
  }
  teamsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!this.form) {
            return;
        }
        if (this.form.value.format === `Single Elimination Ladder` || this.form.value.format === `Double Elimination Ladder`) {
            const foundValue = this.numberOfTeams.find((numberOfTeams) => numberOfTeams.value === control.value);
            if (foundValue) {
                return;
            }
            return { numberOfTeams: { value: control.value }};
        }
        const invalid = control.value % this.form.value.numberOfGroups !== 0 ;
        return invalid ? { numberOfTeams: { value: control.value } } : null;
    };
  }

  clearNumbers() {
      this.form.controls.numberOfGroups.reset();
      this.form.controls.numberOfTeams.reset();
  }

  onChange() {
    this.form.controls.numberOfGroups.updateValueAndValidity();
    this.form.controls.numberOfTeams.updateValueAndValidity();
  }
}
