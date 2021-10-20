import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { isEqual } from 'lodash';

@Component({
  selector: `app-profile`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.scss`]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscriptions: Subscription[] = [];
  activeTab: number;

  routerComponents: {
    [name: string]: any;
  } = {};

  routerEditModes: {
      [name: string]: boolean;
  } = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.activeTab = this.router.getCurrentNavigation().extras.state?.activeTab || 0;
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(
          {
            next: (currentUser: User) => {
              this.currentUser = currentUser;
            },
            complete: async () => {
              await this.getUserDetails();
            }
          }
        ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getUserDetails() {
    const result = await this.apiService.getUserById(this.currentUser.userId);
    if (!isEqual(this.currentUser, result)) {
      this.store.dispatch(new SetCurrentUser(result));
    }
  }

  readRouterOutlet(name: string, event: any) {
    const childRouteConfig = event.activatedRoute?.snapshot.routeConfig;
    this.routerComponents[name] = event;
    this.routerEditModes[name] = childRouteConfig.path !== ``;
    this.changeDetectorRef.detectChanges();
  }
}
