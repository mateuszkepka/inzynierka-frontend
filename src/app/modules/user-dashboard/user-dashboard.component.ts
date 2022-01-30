import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-user-dashboard`,
  templateUrl: `./user-dashboard.component.html`,
  styleUrls: [`./user-dashboard.component.scss`]
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  currentUser: User;
  subscriptions: Subscription[] = [];
  modulesData = {};

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
          this.setModulesData();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  setModulesData() {
    this.modulesData = {
      playerAccounts: {
          title: `Gaming accounts`,
          subtitle: `Manage your gaming accounts`,
          link: `user-accounts`
      },
      userTournaments: {
          title: `Your tournaments`,
          subtitle: `See your tournaments`,
          link: `profile/${this.currentUser.userId}`,
          activeTab: 1
      },
      userProfile: {
          title: `Your profile`,
          subtitle: `Manage your profile`,
          link: `profile/${this.currentUser.userId}`,
          activeTab: 0
      },
      userTeams: {
          title: `Your teams`,
          subtitle: `See or manage your teams`,
          link: `profile/${this.currentUser.userId}`,
          activeTab: 3
      },
      userSuspensions: {
          title: `Your suspensions`,
          subtitle: `See your suspensions`,
          link: `profile/${this.currentUser.userId}`,
          activeTab: 2
      },
      createTournament: {
          title: `Create tournament`,
          subtitle: `Start your own tournament`,
          link: `create-tournament`
      },
      manageTournaments: {
          title: `Manage tournament registrations`,
          subtitle: `Accept registrations to tournaments`,
          link: `manage-tournaments`
      },
      userInvitations: {
          title: `Team invitations`,
          subtitle: `See if you haven't been invited`,
          link: `user-invitations`
      },
      createTeam: {
        title: `Create team`,
        subtitle: `Run your own team`,
        link: `create-team`
      },
      userMatches: {
        title: `Your matches`,
        subtitle: `See your match history`,
        link: `/profile/${this.currentUser.userId}`,
        activeTab: 5
      },
      manageReports: {
        title: `Manage reports`,
        subtitle: `Review reports made by players`,
        link: `/manage-reports`
      },
      manageSuspensions: {
        title: `Manage suspensions`,
        subtitle: `See and manage all suspensions`,
        link: `/manage-suspensions`
      },
      resolveMatches: {
        title: `Resolve matches`,
        subtitle: `Send your match results`,
        link: `/resolve-matches`
      },
      manageRoles: {
        title: `Manage roles`,
        subtitle: `Grant or revoke users roles`,
        link: `/manage-roles`
      }
    };
  }

}
