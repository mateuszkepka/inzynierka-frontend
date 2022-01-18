import { CanActivate, Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";

import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { User } from "../shared/interfaces/interfaces";
import { cloneDeep } from "lodash";

@Injectable({
    providedIn: `root`
})
export class AuthGuard implements CanActivate, OnDestroy {

    currentUser: User | undefined;
    userSub: Subscription;

    constructor(
        private readonly router: Router,
        private readonly store: Store,
    ) {
        this.userSub = this.store
            .select((state) => state.currentUser.currentUser)
            .subscribe((currentUser: User | undefined) => {
                this.currentUser = cloneDeep(currentUser);
            });
    }

    canActivate() {
        if (!this.currentUser) {
            void this.router.navigate([`/`]);
            return false;
        }
        return true;
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
