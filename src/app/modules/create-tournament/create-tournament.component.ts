import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

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

    faTrophy = faTrophy;

    form = new FormGroup({});
    model = { };
    fields: FormlyFieldConfig[] = [
       {
           key: `tournamentName`,
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
           }
       },
       {
           key: `registerEndDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Register end date`,
               placeholder: `Enter register end date`,
               required: true,
           }
       },
       {
           key: `tournamentStartDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Tournament start date`,
               placeholder: `Enter tournament start date`,
               required: true,
           }
       },
       {
           key: `tournamentEndDate`,
           type: `datepicker`,
           templateOptions: {
               label: `Tournament end date`,
               placeholder: `Enter tournament end date`,
               required: true,
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
           key: `numberOfPlayersInTeam`,
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
                required: true,
                showClear: true,
                options: this.gamePresets,
                optionLabel: `name`
            }
        },
        {
            key: `message`,
            type: `textarea`,
            templateOptions: {
                label: `Message`,
                placeholder: `Enter your message`,
                required: true,
                rows: 10,
            }
        },
        {
              key: `torunamentBackgroundTheme`,
              type: `fileUpload`,
              templateOptions: {
                  label: `Upload tournament background theme`,
                  required: true,
              }
        },
        {
              key: `torunamentLogo`,
              type: `fileUpload`,
              templateOptions: {
                  label: `Upload tournament logo`,
                  required: true,
              }
        }
    ];

    onSubmit() {
        console.log(`CREATING TOURNAMENT...`);
    }
}
