import { RouterModule, Routes } from "@angular/router";

import { AddTournamentAdminComponent } from "./add-tournament-admin/add-tournament-admin.component";
import { NgModule } from "@angular/core";
import { RegisterForTournamentComponent } from "./register-for-tournament/register-for-tournament.component";
import { TournamentDetailsComponent } from "./tournament-details/tournament-details.component";
import { TournamentEditComponent } from "./tournament-edit/tournament-edit.component";
import { TournamentsComponent } from "./tournaments.component";

const routes: Routes = [
    {
        path: ``,
        component: TournamentsComponent,
    },
    {
        path: `:id`,
        component: TournamentDetailsComponent
    },
    {
        path: `:id/edit`,
        component: TournamentEditComponent
    },
    {
        path: `:id/register-for-tournament`,
        component: RegisterForTournamentComponent,
    },
    {
        path: `:id/add-admin`,
        component: AddTournamentAdminComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentsRoutingModule { }
