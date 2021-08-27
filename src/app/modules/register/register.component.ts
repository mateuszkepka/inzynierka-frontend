import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: `app-register`,
    templateUrl: `./register.component.html`,
    styleUrls: [`./register.component.scss`]
})
export class RegisterComponent {
    faUserCircle = faUserCircle;

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
            key: `username`,
            type: `input`,
            templateOptions: {
                label: `Username`,
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
        },
        {
            key: `password-repeat`,
            type: `password`,
            templateOptions: {
                label: `Repeat password`,
                placeholder: `Repeat password`,
                required: true,
                toggleMask: true,
            }
        },
        {
            key: `country`,
            type: `input`,
            templateOptions: {
                label: `Country`,
                placeholder: `Enter your country`,
                required: true,
            }
        },
        {
            key: `university`,
            type: `input`,
            templateOptions: {
                label: `University`,
                placeholder: `Enter your university`,
                required: false,
            }
        },
        {
            key: `studentId`,
            type: `input`,
            templateOptions: {
                label: `Student ID Number`,
                placeholder: `Enter your student ID number`,
                required: false,
            }
        },
        {
            key: `studentId`,
            type: `input`,
            templateOptions: {
                label: `Student ID Number`,
                placeholder: `Enter your student ID number`,
                required: false,
            }
        },
        {
            key: `acceptTermsOfUse`,
            type: `checkbox`,
            templateOptions: {
                label: `Accept Terms Of Use`,
                description: `In order to proceed, please accept terms`,
                pattern: `true`,
                required: true
            }
        }
    ];

    onSubmit() {
        console.log(`REGISTERING...`);
    }
}
