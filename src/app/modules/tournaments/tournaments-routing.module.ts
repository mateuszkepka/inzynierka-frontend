import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { TournamentDetailsComponent } from "./tournament-details/tournament-details.component";
import { TournamentsComponent } from "./tournaments.component";

const routes: Routes = [
    {
        path: ``,
        component: TournamentsComponent,
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
