import { CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: `root`
})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router) {}

    canActivate() {
        const isLoggedIn = document.cookie.includes(`Authentication`);
        if (!isLoggedIn) {
            void this.router.navigate([`/`]);
            return false;
        }
        return true;
    }
}
