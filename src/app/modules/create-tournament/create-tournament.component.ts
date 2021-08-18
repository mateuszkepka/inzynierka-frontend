import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: `app-create-tournament`,
    templateUrl: `./create-tournament.component.html`,
    styleUrls: [`./create-tournament.component.scss`]
})
export class CreateTournamentComponent {
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
       }
    ];

    onSubmit() {
        console.log(`CREATING TOURNAMENT...`);
    }
}
