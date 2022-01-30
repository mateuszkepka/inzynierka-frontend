import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { RegisterInput, User } from "src/app/shared/interfaces/interfaces";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { NotificationsService } from "src/app/services/notifications.service";
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

    avatarFormData = new FormData();
    backgroundFormData = new FormData();

    form = new FormGroup({
        email: new FormControl(``, [Validators.required, Validators.email]),
        username: new FormControl(``, [Validators.required]),
        country: new FormControl(``, [Validators.required]),
        university: new FormControl(``),
        password: new FormControl(``, [Validators.required]),
        repeatPassword: new FormControl(``, [Validators.required, this.repeatPasswordValidator()]),
        studentId: new FormControl(``),
        terms: new FormControl(null, [Validators.required])
    });

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {}

    async onSubmit() {
        let requestBody = this.form.value;
        if (!requestBody.studentId || !requestBody.university) {
            requestBody = omit(requestBody, [`studentId`, `university`]);
        }
        const res = await this.apiService.register(
            omit(
                requestBody, [`repeatPassword`, `terms`]
            ) as RegisterInput
        ).catch((err) => {
            err.error.message.forEach((item) => {
                this.showNotification(`error`, `${item}`, `Error!`);
            });
        });
        if (res) {
            this.showNotification(`success`, `Account has been created.`, `Success!`);
            await this.sendImages(res);
            void this.router.navigate([`/log-in`]);
            return;
        }
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

    async sendImages(createdUser) {
        await this.sendAvatar(createdUser);
        await this.sendBackground(createdUser);
    }

    async sendAvatar(createdUser: User) {
        if (!this.avatarFormData.has(`image`)) {
            return;
        }
        const sendAvatarResponse = await this.apiService.uploadUserAvatar(this.avatarFormData, createdUser)
            .catch((err) => {
                const errSeverity = `error`;
                const errDetail = `${err.error.message}`;
                const errSummary = `Error while uploading avatar`;

                this.showNotification(errSeverity, errDetail, errSummary);
            });

        if(sendAvatarResponse) {
            const severity = `success`;
            const detail = `Avatar has been uploaded!`;
            const summary = `Success!`;

            this.showNotification(severity, detail, summary);
        }
    }

    async sendBackground(createdUser: User) {
        if (!this.backgroundFormData.has(`image`)) {
            return;
        }

        const sendBackgroundResponse = await this.apiService.uploadUserBackground(this.backgroundFormData, createdUser)
            .catch((err) => {
                const errSeverity = `error`;
                const errDetail = `${err.error.message}`;
                const errSummary = `Error while uploading background`;

                this.showNotification(errSeverity, errDetail, errSummary);
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
}
