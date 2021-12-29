import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        loadChildren: async () => import(`./modules/home/home.module`).then(
                (m) => m.HomeModule
            ),
    },
    {
        path: ``,
        loadChildren: async () => import(`./modules/profile/profile.module`).then(m => m.ProfileModule),
    },
    {
        path: `user-invitations`,
        loadChildren: async () => import(`./modules/user-invitations/user-invitations.module`).then(m => m.UserInvitationsModule),
    },
    {
        path: `team`,
        loadChildren: async () => import(`./modules/team/team.module`).then(m => m.TeamModule),
    },
    {
        path: `manage-tournaments`,
        loadChildren: async () => import(`./modules/manage-tournaments/manage-tournaments.module`).then(m => m.ManageTournamentsModule)
    },
    {
        path: `user-accounts`,
        canActivate: [AuthGuard],
        loadChildren: async () => import(`./modules/user-accounts/user-accounts.module`).then(m => m.UserAccountsModule),
    },
    {
        path: `create-player`,
        canActivate: [AuthGuard],
        loadChildren: async () => import(`./modules/create-player/create-player.module`).then(m => m.CreatePlayerModule),
    },
    {
        path: `create-team`,
        canActivate: [AuthGuard],
        loadChildren: async () => import(`./modules/create-team/create-team.module`).then(m => m.CreateTeamModule),
    },
    {
        path: `organization`,
        loadChildren: async () => import(`./modules/organization/organization.module`).then(
                (m) => m.OrganizationModule
            ),
    },
    {
        path: `participation`,
        loadChildren: async () => import(`./modules/participation/participation.module`).then(
                (m) => m.ParticipationModule
            ),
    },
    {
        path: `log-in`,
        loadChildren: async () => import(`./modules/log-in/log-in.module`).then(
                (m) => m.LogInModule
            ),
    },
    {
        path: `register`,
        loadChildren: async () => import(`./modules/register/register.module`).then(
                (m) => m.RegisterModule
            ),
    },
    {
        path: `contact-us`,
        loadChildren: async () => import(`./modules/contact-us/contact-us.module`).then(
                (m) => m.ContactUsModule
            ),
    },
    {
        path: `create-tournament`,
        canActivate: [AuthGuard],
        loadChildren: async () => import(`./modules/create-tournament/create-tournament.module`).then(
            (m) => m.CreateTournamentModule
        ),
    },
    {
        path: `tournaments`,
        loadChildren: async () => import(`./modules/tournaments/tournaments.module`).then(
            (m) => m.TournamentsModule
        ),
    },
    {
        path: `user-dashboard`,
        canActivate: [AuthGuard],
        loadChildren: async () => import(`./modules/user-dashboard/user-dashboard.module`).then(
            (m) => m.UserDashboardModule
        ),
    },
    {
        path: `manage-reports`,
        loadChildren: async () => import(`./modules/manage-reports/manage-reports.module`).then(
            (m) => m.ManageReportsModule
        ),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
