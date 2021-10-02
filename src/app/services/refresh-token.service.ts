import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { SetCurrentUser } from "../state/current-user.actions";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { User } from "../shared/interfaces/interfaces";
import { cloneDeep } from 'lodash';

@Injectable({
    providedIn: `root`
})
export class RefreshTokenService {

    subscriptions: Subscription[] = [];
    currentUser: User;

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
        if (this.currentUser) {
            this.refreshToken();
        }
        setInterval(() => {
            if (this.currentUser) {
                this.refreshToken();
                console.log(`COOKIES`, document.cookie);
            }
        }, 5000);
    }

    async refreshToken() {
        (await this.apiService.refreshToken()).subscribe(res => {
            if (res) {
                this.store.dispatch(new SetCurrentUser(res as User));
            }
        });
    }
}
