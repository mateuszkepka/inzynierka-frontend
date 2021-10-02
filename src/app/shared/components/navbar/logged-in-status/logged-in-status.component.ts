import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-logged-in-status`,
  templateUrl: `./logged-in-status.component.html`,
  styleUrls: [`./logged-in-status.component.scss`]
})
export class LoggedInStatusComponent implements OnInit {

  subscriptions: Subscription[] = [];
  currentUser: User;

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        }),
    );
  }

  async logOut() {
    (await this.apiService.logOut()).subscribe((res) => {
      this.store.dispatch(new SetCurrentUser(undefined));
      void this.router.navigate([`/`]);
    });

  }
}
