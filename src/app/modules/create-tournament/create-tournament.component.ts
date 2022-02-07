import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AddPrizeInput, CreateTournamentInput, Format, Tournament } from "src/app/shared/interfaces/interfaces";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { addMinutes, differenceInMilliseconds, isBefore } from "date-fns";
import { cloneDeep, omit } from "lodash";

import { ApiService } from "src/app/services/api.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: `app-create-tournament`,
    templateUrl: `./create-tournament.component.html`,
    styleUrls: [`./create-tournament.component.scss`]
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
    registerStartMinDate = addMinutes(new Date(), 4);
    registerStartDate = new Date();
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
        tournamentName: new FormControl(``, [Validators.required]),
        numberOfPlayers: new FormControl(null, [Validators.required]),
        numberOfTeams: new FormControl(null, [Validators.required, this.teamsNumberValidator()]),
        numberOfMaps: new FormControl(null, [Validators.required]),
        registerStartDate: new FormControl(addMinutes(new Date(), 5), [Validators.required]),
        registerEndDate: new FormControl(null, [Validators.required]),
        tournamentStartDate: new FormControl(null, [Validators.required]),
        numberOfGroups: new FormControl(null, [this.groupsNumberValidator()]),
        endingHour: new FormControl(this.endingHour, [Validators.required]),
        description: new FormControl(``, [Validators.required]),
        format: new FormControl(``, [Validators.required]),
        prize: new FormGroup({
            currency: new FormControl(``, []),
            distribution: new FormControl(``, []),
        }),
        gameId: new FormControl(1, [Validators.required]),
    });

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService,
        private readonly cdRef: ChangeDetectorRef
    ) {
        this.endingHour.setMinutes(0);
    }

    async onSubmit() {
        let requestBody = {
            ...omit(this.form.value, [`endingHour`, `tournamentName`]),
            endingHour: this.form.value.endingHour.getHours(),
            endingMinutes: this.form.value.endingHour.getMinutes(),
            name: this.form.value.tournamentName,
        };

        if (this.form.value.format === `Single Elimination Ladder` || this.form.value.format === `Double Elimination Ladder`) {
            requestBody = {
                ...omit(this.form.value, [`numberOfGroups`, `endingHour`, `tournamentName`]),
                endingHour: this.form.value.endingHour.getHours(),
                endingMinutes: this.form.value.endingHour.getMinutes(),
                name: this.form.value.tournamentName,
            };

        }
        const response = await this.apiService.createTournament(requestBody as CreateTournamentInput)
        .catch((err) => {
            this.notificationsService.addNotification({
                severity: `error`,
                summary: `Error!`,
                detail: `${err.error.message}`
            });
        });

        await this.addTournamentPrize(response as Tournament);
        if (response) {
            this.notificationsService.addNotification({
                severity: `success`,
                summary: `Success!`,
                detail: `Tournament has been created.`
            });

            await this.sendImages(response);
            void this.router.navigate([`/tournaments/${response.tournamentId}`]);
        }
    }

    async ngOnInit() {
        await this.getGamePresets();
        this.subscriptions.push(
            this.form.controls
                .registerStartDate
                .valueChanges
                .subscribe((val) => {
                    this.setRegisterEndMinDate(val);
                }),
            this.form.controls
                .registerEndDate
                .valueChanges
                .subscribe((val) => this.setTournamentStartMinDate(val)),
           this.form.controls
                .format
                .valueChanges
                .subscribe(() => {
                    this.form.controls.numberOfTeams.setValue(null);
                }),
        );
        // this.setRegisterStartDate();

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    async getGamePresets() {
        this.gamePresets = await this.apiService.getFormats().catch(() => []);
    }

    async addTournamentPrize(tournament: Tournament) {
        if (
            this.form.value.prize.distribution
            && this.form.value.prize.currency
        ) {
            const input: AddPrizeInput = {
                tournamentId: tournament.tournamentId,
                distribution: this.form.value.prize.distribution,
                currency: this.form.value.prize.currency || `None`,
            };

            return this.apiService.addPrize(input).catch(() => {});
        }
    }

    setRegisterEndMinDate(date: Date) {
        if (!date) {
            return;
        }

        if (this.form.value.registerEndDate) {
            this.form.controls.registerEndDate.reset();
        }

        if (this.form.value.tournamentStartDate) {
            this.form.controls.tournamentStartDate.reset();
        }

        this.form.patchValue({ registerEndDate: addMinutes(cloneDeep(date), 2)});
        this.registerEndMinDate = addMinutes(cloneDeep(date),1);
    }

    setTournamentStartMinDate(date: Date) {
        if (!date) {
            return;
        }

        if (this.form.value.tournamentStartDate) {
            this.form.controls.tournamentStartDate.reset();
        }

        const newDate = addMinutes(cloneDeep(date), 40);
        this.form.patchValue({ tournamentStartDate: addMinutes(cloneDeep(newDate), 1)});

        this.tournamentStartMinDate = newDate;
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
    const sendAvatarResponse = await this.apiService
        .uploadTournamentAvatar(this.avatarFormData, createdTournament.tournamentId)
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

  async sendBackground(createdTournament: Tournament) {
      if (!this.backgroundFormData.has(`image`)) {
          return;
      }
      const sendBackgroundResponse = await this.apiService
        .uploadTournamentBackground(this.backgroundFormData, createdTournament.tournamentId)
        .catch((err) => {
            const severity = `error`;
            const detail = `${err.error.message}`;
            const summary = `Error while uploading background`;
            this.showNotification(severity, detail, summary);
        });

      if (sendBackgroundResponse) {
        const severity = `success`;
        const detail = `Background has been uploaded!`;
        const summary = `Success!`;
        this.showNotification(severity, detail, summary);
      }

  }

  showNotification(severity: string, detail: string, summary: string) {
    this.notificationsService.addNotification({severity, summary, detail});
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

  registerStartDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!this.form) {
            return;
        }
        if (!control.value) {
            return;
        }

        if(!isBefore(this.registerStartMinDate, control.value)) {
            return { registerStartDate: { value: control.value }};
        }
    };
  }

  registerEndDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!this.form) {
            return;
        }

        if (!control.value) {
            return;
        }

        if(!isBefore(this.registerEndMinDate, control.value)) {
            return { registerEndDate: { value: control.value }};
        }
    };
  }

  tournamentStartDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!this.form) {
            return;
        }

        if (!control.value) {
            return;
        }
        if(!isBefore(this.tournamentStartMinDate, control.value)) {
            return { tournamentStartDate: { value: control.value }};
        }
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
