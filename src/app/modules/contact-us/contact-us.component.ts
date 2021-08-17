import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: `app-contact-us`,
    templateUrl: `./contact-us.component.html`,
    styleUrls: [`./contact-us.component.scss`]
})
export class ContactUsComponent {
    faEnvelopeOpen = faEnvelopeOpen;

    form = new FormGroup({});
    model = {};

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
            key: `subject`,
            type: `input`,
            templateOptions: {
                label: `Subject`,
                placeholder: `Enter subject`,
                required: true,
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
        }
    ];

    onSubmit() {
        console.log(`SENDING CONTACT FORM...`);
    }
}
