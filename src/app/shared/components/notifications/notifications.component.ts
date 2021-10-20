import { Component, OnDestroy, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Notification } from '../../interfaces/interfaces';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: `app-notifications`,
  templateUrl: `./notifications.component.html`,
  styleUrls: [`./notifications.component.scss`],
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notificationsSubscription: Subscription;

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.notificationsSubscription = this.notificationsService.getNotificationsObservable()
      .subscribe((notification: Notification) => {
        this.messageService.add(notification);
      }
    );
  }

  ngOnDestroy() {
    this.notificationsSubscription.unsubscribe();
  }
}
