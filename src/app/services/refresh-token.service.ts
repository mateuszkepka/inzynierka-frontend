import { Subscription, interval } from "rxjs";

import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { NotificationsService } from "./notifications.service";
import { Router } from "@angular/router";
import { SetCurrentUser } from "../state/current-user.actions";
import { Store } from "@ngxs/store";
import { User } from "../shared/interfaces/interfaces";
import { cloneDeep } from 'lodash';

@Injectable({
    providedIn: `root`
})
export class RefreshTokenService {

    subscriptions: Subscription[] = [];
    currentUser: User;
    interval = interval(10000);

    constructor(
        private readonly apiService: ApiService,
        private readonly store: Store,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService,
    ) {
        this.subscriptions.push(
            this.store
                .select((state) => state.currentUser.currentUser)
                .subscribe((currentUser: User) => {
                    this.currentUser = cloneDeep(currentUser);
                })
        );
    }

    async refreshCookies() {
        await this.refreshToken();
        this.subscriptions.push(
            this.interval.subscribe(async () => {
                if (this.currentUser) {
                    await this.refreshToken();
                }
            }),
        );
    }

    async refreshToken() {
        const res = await this.apiService.refreshToken().catch(() => false as const);
        if (res) {
            if (!this.currentUser) {
                this.store.dispatch(new SetCurrentUser(res));
            }
            return;
        }

        if (this.currentUser) {
            this.store.dispatch(new SetCurrentUser(undefined));
            this.notificationsService.addNotification({
                severity: `info`,
                summary: `Session expired`,
                detail: `You have been logged out, please log in again`,
            });
            void this.router.navigate([`/`]);
        }
    }

    clearSubscriptions() {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
