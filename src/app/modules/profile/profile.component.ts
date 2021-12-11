import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-profile`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.scss`]
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentlyLoggedUser: User;
  currentUser: User;
  subscriptions: Subscription[] = [];
  activeTab: number;
  currentUserId: number;

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
    this.currentUserId = Number(this.route.snapshot.params.id);
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(
          async (currentUser: User) => {
            if (currentUser) {
              this.currentlyLoggedUser = currentUser;
            }
            if (currentUser.userId === this.currentUserId) {
              this.currentUser = currentUser;
              return;
            }
            await this.getCurrentUser();
          }
        ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getCurrentUser() {
    this.currentUser = await this.apiService.getUserById(this.currentUserId);
  }

  readRouterOutlet(name: string, event: any) {
    const childRouteConfig = event.activatedRoute?.snapshot.routeConfig;
    this.routerComponents[name] = event;
    this.routerEditModes[name] = childRouteConfig.path !== ``;
    this.changeDetectorRef.detectChanges();
  }
}
