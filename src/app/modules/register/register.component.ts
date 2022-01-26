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
            this.showNotification(`error`, `${err.error.message}`, `Error!`);
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
        const sendAvatarResponse = await this.apiService.uploadUserAvatar(this.avatarFormData, createdUser);
        let severity = `success`;
        let detail = `Avatar has been uploaded!`;
        let summary = `Success!`;

        if (!sendAvatarResponse.ok) {
            severity = `error`;
            detail = sendAvatarResponse.statusText;
            summary = `Error while uploading avatar`;
        }

        this.showNotification(severity, detail, summary);
    }

    async sendBackground(createdUser: User) {
        if (!this.backgroundFormData.has(`image`)) {
            return;
        }

        const sendBackgroundResponse = await this.apiService.uploadUserBackground(this.backgroundFormData, createdUser);
        let severity = `success`;
        let detail = `Background has been uploaded!`;
        let summary = `Success!`;

        if (!sendBackgroundResponse.ok) {
            severity = `error`;
            detail = sendBackgroundResponse.statusText;
            summary = `Error while uploading background`;
        }

        this.showNotification(severity, detail, summary);
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
