import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
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
    form = new FormGroup({});
    model = { };
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
            }
        }
    ];

    onSubmit() {
        console.log(`SENDING...`);
    }
}
