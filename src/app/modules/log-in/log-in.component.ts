import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LogInInput } from "src/app/shared/interfaces/register-input.interface";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: `app-log-in`,
    templateUrl: `./log-in.component.html`,
    styleUrls: [`./log-in.component.scss`],
})
export class LogInComponent {
    // FONT AWESOME
    faGamepad = faGamepad;

    // FORM
    model = { email: ``, password: `` };
    formOptions: FormlyFormOptions = {
        formState: {
            model: this.model,
        }
    };
    form = new FormGroup({});
    fields: FormlyFieldConfig[] = [
        {
            key: `email`,
            type: `input`,
            templateOptions: {
                label: `E-mail Address`,
                placeholder: `Enter e-mail`,
                required: true,
            }
        },
        {
            key: `password`,
            type: `password`,
            templateOptions: {
                label: `Password`,
                placeholder: `Enter password`,
                required: true,
                modelField: `password`,
            }
        }
    ];

    constructor(private readonly apiService: ApiService) {}


    async onSubmit() {
        (await this.apiService.login(this.model as LogInInput)).subscribe((res) => {
            if (res) {
                console.log(res);
                return;
            }
        }, () => {
        });
    }
}
