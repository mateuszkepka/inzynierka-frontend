import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RegisterForTournamentComponent } from "./register-for-tournament/register-for-tournament.component";
import { TournamentDetailsComponent } from "./tournament-details/tournament-details.component";
import { TournamentsComponent } from "./tournaments.component";

const routes: Routes = [
    {
        path: ``,
        component: TournamentsComponent,
    },
    {
        path: `register-for-tournament`,
        component: RegisterForTournamentComponent,
    },
    {
        path: `:id`,
        component: TournamentDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentsRoutingModule { }
