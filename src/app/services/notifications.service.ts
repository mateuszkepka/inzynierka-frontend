import { Injectable } from "@angular/core";
import { Notification } from "../shared/interfaces/interfaces";
import { Subject } from "rxjs";

@Injectable({ providedIn: `root` })
export class NotificationsService {
    notifications$: Subject<Notification> = new Subject();

    addNotification(notification: Notification) {
        this.notifications$.next(notification);
    }

    getNotificationsObservable() {
        return this.notifications$.asObservable();
    }
}
