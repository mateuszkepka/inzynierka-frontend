import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AddPrizeInput, CreateTournamentInput, Format, Tournament } from "src/app/shared/interfaces/interfaces";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "src/app/services/api.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { omit } from "lodash";

@Component({
    selector: `app-create-tournament`,
    templateUrl: `./create-tournament.component.html`,
    styleUrls: [`./create-tournament.component.scss`]
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
    registerStartMinDate = new Date();
    registerEndMinDate = new Date();
    tournamentStartMinDate = new Date();
    tournamentEndMinDate = new Date();
    endingHour = new Date();

    subscriptions: Subscription[] = [];
    gamePresets: Format[] = [];

    faTrophy: IconDefinition = faTrophy;

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

    avatarFormData = new FormData();
    backgroundFormData = new FormData();

    form = new FormGroup({
        name: new FormControl(``, [Validators.required]),
        numberOfPlayers: new FormControl(null, [Validators.required]),
        numberOfTeams: new FormControl(null, [Validators.required, this.teamsNumberValidator()]),
        numberOfMaps: new FormControl(null, [Validators.required]),
        registerStartDate: new FormControl(``, [Validators.required]),
        registerEndDate: new FormControl(``, [Validators.required]),
        tournamentStartDate: new FormControl(``, [Validators.required]),
        numberOfGroups: new FormControl(null, [this.groupsNumberValidator()]),
        endingHour: new FormControl(this.endingHour, [Validators.required]),
        description: new FormControl(``, [Validators.required]),
        format: new FormControl(``, [Validators.required]),
        prize: new FormGroup({
            currency: new FormControl(``, [Validators.required]),
            distribution: new FormControl(``, [Validators.required]),
        }),
        gameId: new FormControl(1, [Validators.required]),
    });

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {
        this.endingHour.setMinutes(0);
    }

    async onSubmit() {
        let requestBody = {
            ...omit(this.form.value, [`endingHour`]),
            endingHour: this.form.value.endingHour.getHours(),
            endingMinutes: this.form.value.endingHour.getMinutes(),
        };

        if (this.form.value.format === `Single Elimination Ladder` || this.form.value.format === `Double Elimination Ladder`) {
            requestBody = {
                ...omit(this.form.value, [`numberOfGroups`, `endingHour`]),
                endingHour: this.form.value.endingHour.getHours(),
                endingMinutes: this.form.value.endingHour.getMinutes(),
            };

        }
        const response = await this.apiService.createTournament(requestBody as CreateTournamentInput)
        .catch((err) => {
            this.notificationsService.addNotification({
                severity: `error`,
                summary: `Error!`,
                detail: `${err.error.message}`
            });
            return;
        });

        const addPrizeResponse = await this.addTournamentPrize(response as Tournament);
        if (response && addPrizeResponse) {
            this.notificationsService.addNotification({
                severity: `success`,
                summary: `Success!`,
                detail: `Tournament has been created.`
            });

            await this.sendImages(response);
            void this.router.navigate([`/tournaments/${response.tournamentId}`]);
            return;
        }

    }

    async ngOnInit() {
        await this.getGamePresets();
        this.subscriptions.push(
            this.form.controls
                .registerStartDate
                .valueChanges
                .subscribe((val) => this.setRegisterEndMinDate(val)),
            this.form.controls
                .registerEndDate
                .valueChanges
                .subscribe((val) => this.setTournamentStartMinDate(val)),
            this.form.controls
                .tournamentStartDate
                .valueChanges
                .subscribe((val) => this.setTournamentEndMinDate(val)),
            this.form.controls
                .format
                .valueChanges
                .subscribe(() => {
                    this.form.controls.numberOfTeams.setValue(null);
                }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    async getGamePresets() {
        this.gamePresets = await this.apiService.getFormats();
    }

    async addTournamentPrize(tournament: Tournament) {
        const input: AddPrizeInput = {
            tournamentId: tournament.tournamentId,
            distribution: this.form.value.prize.distribution,
            currency: this.form.value.prize.currency || `None`,
        };

        return await this.apiService.addPrize(input);
    }

    setRegisterEndMinDate(date: Date) {
        this.registerEndMinDate = date;
    }

    setTournamentStartMinDate(date: Date) {
        this.tournamentStartMinDate = date;
    }

    setTournamentEndMinDate(date: Date) {
        this.tournamentEndMinDate = date;
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

  async sendImages(createdTournament) {
    await this.sendAvatar(createdTournament);
    await this.sendBackground(createdTournament);
}

  async sendAvatar(createdTournament: Tournament) {
    if (!this.avatarFormData.has(`image`)) {
        return;
    }
    const sendAvatarResponse = await this.apiService.uploadTournamentAvatar(this.avatarFormData, createdTournament.tournamentId);
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

  async sendBackground(createdTournament: Tournament) {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService
        .uploadTournamentBackground(this.backgroundFormData, createdTournament.tournamentId);
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

  groupsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!this.form) {
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
        const invalid = control.value % this.form.value.numberOfGroups !== 0 ;
        return invalid ? { numberOfTeams: { value: control.value } } : null;
    };
  }
}
