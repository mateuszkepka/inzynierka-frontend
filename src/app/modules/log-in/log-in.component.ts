import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { LogInInput, User } from "src/app/shared/interfaces/interfaces";

import { ApiService } from "src/app/services/api.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NotificationsService } from "src/app/services/notifications.service";
import { RefreshTokenService } from "src/app/services/refresh-token.service";
import { Router } from "@angular/router";
import { SetCurrentUser } from "src/app/state/current-user.actions";
import { Store } from "@ngxs/store";
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
                showFeedback: false,
            }
        }
    ];

    constructor(
        private readonly apiService: ApiService,
        private readonly store: Store,
        private readonly router: Router,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly notificationsService: NotificationsService,
    ) {}


    async onSubmit() {
        (await this.apiService.login(this.model as LogInInput)).subscribe(async (res) => {
            if (res) {
                this.store.dispatch(new SetCurrentUser(res as User));
                await this.refreshTokenService.refreshCookies();
                void this.router.navigate([`/user-dashboard`]);
                return;
            }
        }, () => {
            this.notificationsService.addNotification({ severity: `error`, detail: `Please try again!`, summary: `Something went wrong` });
        });
    }
}
