import { AddPrizeInput, CreateTournamentInput, Tournament } from "src/app/shared/interfaces/interfaces";
import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { NotificationsService } from "src/app/services/notifications.service";
import { Router } from "@angular/router";

interface GamePreset {
    name: string;
    value: string;
}

@Component({
    selector: `app-create-tournament`,
    templateUrl: `./create-tournament.component.html`,
    styleUrls: [`./create-tournament.component.scss`]
})
export class CreateTournamentComponent {
    gamePresets: GamePreset[] = [
        {
            name: `Preset 1`,
            value: `pre-1`,
        },
        {
            name: `Preset 2`,
            value: `pre-2`,
        },
        {
            name: `Preset 3`,
            value: `pre-3`,
        }
    ];

    faTrophy: IconDefinition = faTrophy;

    form = new FormGroup({});

    model: CreateTournamentInput = {
        name: undefined,
        numberOfPlayers: undefined,
        numberOfTeams: undefined,
        registerStartDate: undefined,
        registerEndDate: undefined,
        tournamentStartDate: undefined,
        tournamentEndDate: undefined,
        description: undefined,
        currency: undefined,
        distribution: undefined,
    };

    fields: FormlyFieldConfig[] = [
       {
           key: `name`,
           type: `input`,
           templateOptions: {
               label: `Name your tournament`,
               placeholder: `Enter your tournament name`,
               required: true,
           }
       },
       {
           key: `registerStartDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Register start date`,
               placeholder: `Enter register start date`,
               required: true,
               modelField: `registerStartDate`,
           }
       },
       {
           key: `registerEndDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Register end date`,
               placeholder: `Enter register end date`,
               required: true,
               modelField: `registerEndDate`,
           }
       },
       {
           key: `tournamentStartDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Tournament start date`,
               placeholder: `Enter tournament start date`,
               required: true,
               modelField: `tournamentStartDate`,
           }
       },
       {
           key: `tournamentEndDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Tournament end date`,
               placeholder: `Enter tournament end date`,
               required: true,
               modelField: `tournamentEndDate`,
           }
       },
       {
           key: `numberOfTeams`,
           type: `input`,
           templateOptions: {
               type: `number`,
               label: `Number of teams`,
               placeholder: `Enter number of teams`,
               required: true,
           }
       },
       {
           key: `numberOfPlayers`,
           type: `input`,
           templateOptions: {
               type: `number`,
               label: `Number of players in teams`,
               placeholder: `Enter number of players in team`,
               required: true,
           }
       },
       {
            key: `gamesPreset`,
            type: `dropdown`,
            templateOptions: {
                label: `Select games preset`,
                placeholder: `Select games preset`,
                showClear: true,
                options: this.gamePresets,
                optionLabel: `name`
            }
        },
        {
            key: `distribution`,
            type: `input`,
            templateOptions: {
                label: `Prize`,
                placeholder: `Enter prize`,
                required: true,
            }
        },
        {
            key: `currency`,
            type: `input`,
            templateOptions: {
                label: `Currency`,
                placeholder: `Enter currency`,
            }
        },
        {
            key: `description`,
            type: `textarea`,
            templateOptions: {
                label: `Description`,
                placeholder: `Enter your description`,
                required: true,
                rows: 10,
            }
        },
        {
              key: `torunamentBackgroundTheme`,
              type: `fileUpload`,
              templateOptions: {
                  label: `Upload tournament background theme`,
              }
        },
        {
              key: `torunamentLogo`,
              type: `fileUpload`,
              templateOptions: {
                  label: `Upload tournament logo`,
              }
        }
    ];

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {}

    async onSubmit() {
        const response = await this.apiService.createTournament(this.model);
        const addPrizeResponse = await this.addTournamentPrize(response);

        if (response && addPrizeResponse) {
            this.notificationsService.addNotification({
                severity: `success`,
                summary: `Success!`,
                detail: `Tournament has been created.`
            });
            void this.router.navigate([`/tournaments/${response.tournamentId}`]);
            return;
        }

        this.notificationsService.addNotification({
            severity: `error`,
            summary: `Error!`,
            detail: `Something went wrong.`
        });
    }

    async addTournamentPrize(tournament: Tournament) {
        const input: AddPrizeInput = {
            tournamentId: tournament.tournamentId,
            distribution: this.model.distribution,
            currency: this.model.currency || `None`,
        };

        return await this.apiService.addPrize(input);
    }
}
