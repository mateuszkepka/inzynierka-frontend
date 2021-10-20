import { Subscription, interval } from "rxjs";

import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
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

    constructor(private readonly apiService: ApiService, private readonly store: Store) {
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
        (await this.apiService.refreshToken()).subscribe((res: User) => {
            if (res) {
                if (!this.currentUser) {
                    this.store.dispatch(new SetCurrentUser(res));
                }
            }
        });
    }

    clearSubscriptions() {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
