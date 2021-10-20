import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { NotificationsService } from "src/app/services/notifications.service";
import { RegisterInput } from "src/app/shared/interfaces/interfaces";
import { Router } from "@angular/router";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: `app-register`,
    templateUrl: `./register.component.html`,
    styleUrls: [`./register.component.scss`],
})
export class RegisterComponent {
    faUserCircle = faUserCircle;

    form = new FormGroup({});

    model = {
        email: ``,
        username: ``,
        country: ``,
        university: ``,
        password: ``,
        repeatPassword: ``,
        studentId: ``
    };

    formOptions: FormlyFormOptions = {
        formState: {
            model: this.model,
        }
    };

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
                modelField: `password`,
            },
        },
        {
            key: `password-repeat`,
            type: `password`,
            templateOptions: {
                label: `Repeat password`,
                placeholder: `Repeat password`,
                required: true,
                toggleMask: true,
                modelField: `repeatPassword`
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

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {}

    async onSubmit() {
        (await this.apiService.register(this.model as RegisterInput)).subscribe((res) => {
            if (res) {
                this.notificationsService.addNotification({severity: `success`, summary: `Success!`, detail: `Account has been created.`});
                void this.router.navigate([`/log-in`]);
                return;
            }
        }, () => {
            this.notificationsService.addNotification({severity: `error`, summary: `Error!`, detail: `An error occurred.`});
        });

    }
}
