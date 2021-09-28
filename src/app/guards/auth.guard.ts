import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: `root`
})
export class AuthGuard implements CanActivate {

    canActivate() {
        console.log(document.cookie);
        return true;
    }
}
