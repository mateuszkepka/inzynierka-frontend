import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { NotificationsService } from "src/app/services/notifications.service";
import { RegisterInput } from "src/app/shared/interfaces/interfaces";
import { Router } from "@angular/router";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { omit } from "lodash";

@Component({
    selector: `app-register`,
    templateUrl: `./register.component.html`,
    styleUrls: [`./register.component.scss`],
})
export class RegisterComponent {
    faUserCircle = faUserCircle;

    form = new FormGroup({
        email: new FormControl(``, [Validators.required, Validators.email]),
        username: new FormControl(``, [Validators.required]),
        country: new FormControl(``, [Validators.required]),
        university: new FormControl(``, [Validators.required]),
        password: new FormControl(``, [Validators.required]),
        repeatPassword: new FormControl(``, [Validators.required, this.repeatPasswordValidator()]),
        studentId: new FormControl(``, [Validators.required]),
        terms: new FormControl(false, [Validators.required])
    });

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {}

    async onSubmit() {
        const res = await this.apiService.register(
            omit(
                this.form.value, [`repeatPassword`, `terms`]
            ) as RegisterInput
        );
        if (res) {
            this.notificationsService.addNotification({severity: `success`, summary: `Success!`, detail: `Account has been created.`});
            void this.router.navigate([`/log-in`]);
            return;
        }
        this.notificationsService.addNotification({severity: `error`, summary: `Error!`, detail: `An error occurred.`});
    }

    repeatPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!this.form) {
                return;
            }
            const valid = control.value !== this.form.value.password;
            return valid ? { notMatchingPassword: { value: control.value } } : null;
        };
    }
}
